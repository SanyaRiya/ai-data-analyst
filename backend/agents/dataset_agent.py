import pandas as pd


class DatasetUnderstandingAgent:
    """
    Agent responsible for understanding the uploaded dataset.
    """

    def analyze(self, df: pd.DataFrame) -> dict:
        """
        Analyze the dataset and return a summary.
        """

        summary = {
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": df.columns.tolist(),
            "data_types": {
                column: str(dtype)
                for column, dtype in df.dtypes.items()
            },
            "numeric_columns": df.select_dtypes(
                include="number"
            ).columns.tolist(),
            "categorical_columns": df.select_dtypes(
                exclude="number"
            ).columns.tolist(),
            "missing_values": df.isnull().sum().to_dict(),
            "duplicate_rows": int(df.duplicated().sum()),
            "memory_usage_kb": round(
                df.memory_usage(deep=True).sum() / 1024,
                2,
            ),
            "preview": df.head().to_dict(orient="records"),
        }

        return summary