# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.detect import router as detect_router

app = FastAPI(
    title="Card Detection API",
    version="1.0.0",
    description="Detect playing cards from images"
)

# CORS (React / Vite friendly)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(detect_router, prefix="/api")

@app.get("/")
def root():
    return {
        "status": "ok",
        "service": "Card Detection API"
    }