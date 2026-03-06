# app/api/detect.py
from fastapi import APIRouter, UploadFile, File, HTTPException
import torch
import torch.nn as nn
import torch.nn.functional as F
import cv2
import numpy as np
from PIL import Image
from torchvision import transforms
from ultralytics import YOLO
from pathlib import Path
import time
import logging
from typing import List

router = APIRouter()
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent

# ===============================
# MODEL PATHS
# ===============================
CARD_MODEL_PATH = BASE_DIR / "models" / "CardPicModel1.pt"
SYMBOL_DIGIT_MODEL_PATH = BASE_DIR / "models" / "SymbolDigitModel2.pt"
SYMBOL_CLASSIFIER_PATH = BASE_DIR / "models" / "symbol_classifier.pth"
RANK_CLASSIFIER_PATH = BASE_DIR / "models" / "rank_classifier.pth"
RANK_CLASSES_PATH = BASE_DIR / "models" / "rank_classes.txt"

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ===============================
# CNN MODELS
# ===============================
class SymbolCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 128)
        self.fc2 = nn.Linear(128, 4)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = F.relu(self.fc1(x))
        return self.fc2(x)


class RankCNN(nn.Module):
    def __init__(self, n):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 128)
        self.fc2 = nn.Linear(128, n)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = F.relu(self.fc1(x))
        return self.fc2(x)

# ===============================
# LOAD MODELS (ONCE)
# ===============================
card_detector = YOLO(str(CARD_MODEL_PATH))
symbol_digit_detector = YOLO(str(SYMBOL_DIGIT_MODEL_PATH))

symbol_model = SymbolCNN().to(DEVICE)
symbol_model.load_state_dict(torch.load(SYMBOL_CLASSIFIER_PATH, map_location=DEVICE))
symbol_model.eval()

with open(RANK_CLASSES_PATH) as f:
    rank_classes = [l.strip() for l in f.readlines()]

rank_model = RankCNN(len(rank_classes)).to(DEVICE)
rank_model.load_state_dict(torch.load(RANK_CLASSIFIER_PATH, map_location=DEVICE))
rank_model.eval()

symbol_classes = ["C", "D", "H", "S"]

transform = transforms.Compose([
    transforms.Resize((32, 32)),
    transforms.ToTensor(),
    transforms.Normalize([0.5] * 3, [0.5] * 3),
])

# ===============================
# HELPERS
# ===============================
def predict(model, img, classes=None):
    x = transform(img).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
        out = model(x)
        idx = torch.argmax(out, 1).item()
    return classes[idx] if classes else idx

# ===============================
# API ROUTE
# ===============================
@router.post("/detect")
async def detect_cards(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "Invalid image")

    image_bytes = await file.read()
    image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

    if image is None:
        raise HTTPException(400, "Image decode failed")

    cards = []
    detections = card_detector(image)[0]

    for box in detections.boxes.xyxy:
        x1, y1, x2, y2 = map(int, box)
        card = image[y1:y2, x1:x2]

        sd = symbol_digit_detector(card)[0]
        symbol_img, rank_img = None, None

        for b, c in zip(sd.boxes.xyxy, sd.boxes.cls):
            bx1, by1, bx2, by2 = map(int, b)
            crop = card[by1:by2, bx1:bx2]
            if crop.size == 0:
                continue

            pil = Image.fromarray(cv2.cvtColor(crop, cv2.COLOR_BGR2RGB))
            if int(c) == 0:
                symbol_img = pil
            else:
                rank_img = pil

        if symbol_img and rank_img:
            s = predict(symbol_model, symbol_img, symbol_classes)
            r = predict(rank_model, rank_img, rank_classes)
            cards.append(f"{r}{s}")

    return {
        "success": True,
        "count": len(cards),
        "cards": cards
    }