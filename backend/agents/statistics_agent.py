import pandas as pd


class StatisticalAnalysisAgent:
    """
    Agent responsible for generating statistical summaries
    of the uploaded dataset.
    """

    def analyze(self, df: pd.DataFrame) -> dict:

        numeric_summary = {}

        numeric_columns = df.select_dtypes(include="number").columns

        for column in numeric_columns:

            numeric_summary[column] = {
                "count": int(df[column].count()),
                "mean": float(round(df[column].mean(), 2)),
                "median": float(round(df[column].median(), 2)),
                "min": float(round(df[column].min(), 2)),
                "max": float(round(df[column].max(), 2)),
                "std": float(round(df[column].std(), 2)),
            }

        categorical_summary = {}

        categorical_columns = df.select_dtypes(exclude="number").columns

        for column in categorical_columns:

            mode = df[column].mode()

            most_frequent = None

            if not mode.empty:
                value = mode.iloc[0]

                # Convert NumPy types to Python native types
                if hasattr(value, "item"):
                    value = value.item()

                most_frequent = value

            categorical_summary[column] = {
                "unique_values": int(df[column].nunique()),
                "most_frequent": most_frequent,
            }

        # Correlation matrix
        correlation_df = (
            df.select_dtypes(include="number")
            .corr()
            .round(2)
        )

        correlation_matrix = {}

        for row in correlation_df.index:
            correlation_matrix[row] = {}

            for col in correlation_df.columns:
                correlation_matrix[row][col] = float(correlation_df.loc[row, col])

        return {
            "numeric_summary": numeric_summary,
            "categorical_summary": categorical_summary,
            "correlation_matrix": correlation_matrix,
        }