Step1: Impport Necessary Libraries
pip install torch torchvision pillow matplotlib


Step2: *******Run Below code to make required structure*******

import torch
from PIL import Image
from torchvision import transforms
import torch.nn.functional as F

# CNN class must be defined here
class SymbolCNN(torch.nn.Module):
    def __init__(self, num_classes=4):
        super().__init__()
        self.conv1 = torch.nn.Conv2d(3,32,3,padding=1)
        self.conv2 = torch.nn.Conv2d(32,64,3,padding=1)
        self.pool = torch.nn.MaxPool2d(2,2)
        self.fc1 = torch.nn.Linear(64*8*8,128)
        self.fc2 = torch.nn.Linear(128,num_classes)
    def forward(self,x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1,64*8*8)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Load model once
model = SymbolCNN(num_classes=4)
model.load_state_dict(torch.load("symbol_classifier.pth", map_location='cpu'))
model.eval()

# Preprocessing transforms
infer_transforms = transforms.Compose([
    transforms.Resize((32,32)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3,[0.5]*3)
])

# Class names
classes = ['club','diamond','heart','spade']

# Reusable prediction function
def predict_symbol(image_path):
    img = Image.open(image_path).convert("RGB")
    img_tensor = infer_transforms(img).unsqueeze(0)
    with torch.no_grad():
        outputs = model(img_tensor)
        _, pred = torch.max(outputs,1)
    return classes[pred.item()]


Step3: *******Use it the following way*******

symbol = predict_symbol("symbol_8.jpg")
print("Predicted symbol:", symbol)