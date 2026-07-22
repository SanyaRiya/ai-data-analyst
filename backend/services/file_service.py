from pathlib import Path
import pandas as pd


UPLOAD_DIR = Path("uploads")


def save_uploaded_file(file, filename: str) -> Path:
    """
    Save the uploaded file to the uploads directory.
    """

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path


def load_dataset(file_path: Path) -> pd.DataFrame:
    """
    Load CSV or Excel file into a Pandas DataFrame.
    """

    if file_path.suffix == ".csv":
        return pd.read_csv(file_path)

    elif file_path.suffix in [".xlsx", ".xls"]:
        return pd.read_excel(file_path)

    else:
        raise ValueError("Unsupported file format")