from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from services.file_service import (
    save_uploaded_file,
    load_dataset,
)

from agents.coordinator_agent import CoordinatorAgent


app = FastAPI(
    title="AI Data Analyst Team API",
    version="1.0.0",
    description="Backend API for the AI Data Analyst Team project."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

Path("charts").mkdir(parents=True, exist_ok=True)
Path("reports").mkdir(parents=True, exist_ok=True)

app.mount(
    "/charts",
    StaticFiles(directory="charts"),
    name="charts",
)

app.mount(
    "/reports",
    StaticFiles(directory="reports"),
    name="reports",
)

@app.get("/")
def root():
    return {
        "message": "AI Data Analyst Team API is running!"
    }


@app.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    """
    Upload a CSV or Excel dataset and run the complete AI Data Analyst pipeline.
    """

    try:
        # Save uploaded file
        file_path = save_uploaded_file(file, file.filename)

        # Load dataset
        dataset = load_dataset(file_path)

        # Run coordinator
        coordinator = CoordinatorAgent()

        result = coordinator.run(
            dataset=dataset,
            filename=file.filename,
        )

        return {
            "filename": file.filename,
            **result
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )