from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AU Help AI",
    description="Annamalai University AI Assistant Backend",
    version="1.0.0"
)

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "project": "AU Help AI",
        "status": "online",
        "message": "AU Help AI backend is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/api/student")
def student(
    register_number: str = Query(..., min_length=1)
):
    return {
        "success": False,
        "register_number": register_number,
        "message": "AU student lookup connector is not connected yet."
    }
