import pandas as pd


class DataCleaningAgent:
    """
    Agent responsible for inspecting data quality
    and suggesting cleaning actions.
    """

    def analyze(self, df: pd.DataFrame) -> dict:

        recommendations = []

        # Missing values
        missing = df.isnull().sum()
        missing = missing[missing > 0]

        if not missing.empty:
            recommendations.append(
                "Dataset contains missing values."
            )

        # Duplicate rows
        duplicates = int(df.duplicated().sum())

        if duplicates > 0:
            recommendations.append(
                f"{duplicates} duplicate rows detected."
            )

        # Date columns
        date_columns = []

        for column in df.columns:
            if "date" in column.lower():
                date_columns.append(column)

        if date_columns:
            recommendations.append(
                "Convert date columns to datetime format."
            )

        # Categorical columns
        categorical_columns = []

        for column in df.select_dtypes(include="object").columns:

            if df[column].nunique() < 20:
                categorical_columns.append(column)

        if categorical_columns:
            recommendations.append(
                "Consider converting low-cardinality text columns to category type."
            )

        return {
            "missing_values": missing.to_dict(),
            "duplicate_rows": duplicates,
            "possible_date_columns": date_columns,
            "low_cardinality_columns": categorical_columns,
            "recommendations": recommendations,
        }