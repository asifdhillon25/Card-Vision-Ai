# ♠️ Card Vision AI - Intelligent Playing Card Detection

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-green)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![YOLO](https://img.shields.io/badge/YOLO-v8-red)](https://ultralytics.com/yolov8)
[![License](https://img.shields.io/badge/License-MIT-yellow)](./LICENSE)

<p align="center">
  <img src="https://via.placeholder.com/800x400/0A0C14/FFD700?text=Card+Vision+AI" alt="Card Vision AI Banner" width="800"/>
</p>

---

## 📖 Project Description

**Card Vision AI** is a cutting-edge computer vision system that automatically detects and identifies playing cards from images and videos. Built with YOLO object detection models and custom CNN classifiers, it provides real-time card recognition capabilities—perfect for tracking played cards during poker games, magic tricks, or card counting practice.

### 🎯 Motivation

During card games, keeping track of played cards is crucial for strategy. Card Vision AI automates this process, allowing players to focus on the game while the system catalogs every card that appears. Ideal for professional players, hobbyists, or developers exploring computer vision.

---

## 🔍 How It Works

The pipeline works in stages:

1. **Card Detection:** First YOLO model detects the top-left part of each card (rank + suit region).
2. **Region Detection:** Second YOLO model crops rank and suit separately.
3. **Classification:** Two CNN classifiers predict rank (A,2–10,J,Q,K) and suit (♣,♦,♥,♠).
4. **Result Compilation:** Returns an array of detected cards in standard notation like `["3C", "AC", "QH", "10D"]`.

---

## ✨ Features

### Core Functionality
- 📸 **Multiple Input Methods:** Images or real-time camera capture.
- 🎥 **Video Processing:** Frame-by-frame card detection.
- 📦 **Batch Processing:** Detect multiple images at once.
- ⚡ **Real-time Detection:** Optimized inference (~2–3s per image).

### Technical Highlights
- 🔬 **Dual YOLO Models:** For card detection and rank/suit isolation.
- 🧠 **Custom CNN Classifiers:** Specialized for rank & suit recognition.
- 🎨 **Beautiful UI:** React + Tailwind CSS, SVG card renders.
- 📊 **Analytics:** Stats on detected cards.

### User Experience
- 🃏 **Visual Card Display:** High-quality SVGs arranged in a fan.
- 🎯 **Drag & Drop Upload:** Simple file uploads.
- 📸 **Camera Integration:** Capture images directly.
- 💾 **Export Options:** JSON download of results.
- 🎨 **Modern Aesthetics:** Dark theme, gold accents, glass morphism.

---

## 📸 Demo

<p align="center">
  <img src="https://via.placeholder.com/600x400/1A1C24/FFD700?text=Upload+Interface" alt="Upload Interface" width="300"/>
  <img src="https://via.placeholder.com/600x400/1A1C24/FFD700?text=Detection+Results" alt="Detection Results" width="300"/>
</p>

---

## 🚀 Installation

### Prerequisites
- Python 3.8+ (Backend)
- Node.js 16+ (Frontend)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/asifdhillon25/Card-Vision-Ai.git
cd Card-Vision-Ai

## 🚀 Installation & Setup

### Step 2: Set Up Backend (Python)

Create & activate a virtual environment:

**Linux/Mac**
```bash
python -m venv venv
source venv/bin/activate

Windows

python -m venv venv
venv\Scripts\activate

Install Python dependencies:

pip install -r requirements.txt
Step 3: Set Up Frontend (React)
cd client
npm install
🎮 Running the Project
Backend Server
uvicorn app.main:app --reload --port 8000

API available at: http://127.0.0.1:8000

Interactive API docs: Swagger
 | ReDoc

Frontend
cd client
npm run dev

Frontend available at http://localhost:5173

📡 API Usage
Single Image Detection

Endpoint: POST /api/detect

Request:

curl -X POST "http://localhost:8000/api/detect" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@hand_of_cards.jpg"

Response:

{
  "cards": ["AS", "KH", "QD", "10C", "2H"],
  "count": 5,
  "success": true
}
Batch Detection

Endpoint: POST /api/detect/batch

Request: Multiple images (max 10)

curl -X POST "http://localhost:8000/api/detect/batch" \
  -H "accept: application/json" \
  -H "Content-Type: multipart/form-data" \
  -F "files=@hand1.jpg" \
  -F "files=@hand2.jpg"
📁 Folder Structure
Card-Vision-Ai/
├── server/
│   ├── app/
│   │   ├── main.py
│   │   ├── models/            # YOLO & CNN models
│   │   └── __init__.py
│   ├── requirements.txt
│   └── venv/
├── client/
│   ├── public/cards/           # SVG card images
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
├── README.md
└── .gitignore
🤖 Models & Dataset
Model	Purpose	Format
CardPicModel1.pt	Detects entire playing cards	YOLO
SymbolDigitModel2.pt	Detects rank & suit regions	YOLO
symbol_classifier.pth	Classifies suit symbols (♣♦♥♠)	PyTorch CNN
rank_classifier.pth	Classifies card ranks (A,2–10,J,Q,K)	PyTorch CNN

Getting the Models:
Email asifdhillon25@gmail.com to request pretrained model files.

Dataset:

10,000+ labeled card images

All 52 standard playing cards, multiple angles, lighting, backgrounds

Annotated bounding boxes for cards, rank & suit

🎥 Video Processing

Extract frames from video

Run card detection frame by frame

Track cards to avoid duplicates

Generate annotated video with bounding boxes

🤝 Contributing

Fork repo → Create branch → Commit → Push → Pull Request

Follow PEP8 (Python) & ESLint (JS)

Update README and add tests

Areas for improvement:

GPU acceleration

Real-time webcam detection

Mobile app

Multiplayer support

📞 Contact

GitHub: asifdhillon25

Email: asifdhillon25@gmail.com

📄 License

This project is licensed under the MIT License.

MIT License
Copyright (c) 2024 Asif Dhillon

Permission is hereby granted, free of charge, to any person obtaining a copy...
🙏 Acknowledgments

Ultralytics YOLO

FastAPI

React & Tailwind CSS

All contributors and testers

<p align="center">Made with ♥ by Asif Dhillon | ⭐ Star this project if you find it useful!</p> ```
