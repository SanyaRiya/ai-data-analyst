from pathlib import Path

import matplotlib
matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd


CHART_DIR = Path("backend/charts")


class VisualizationAgent:
    """
    Generates all charts required for the AI Data Analyst project.
    """

    def __init__(self):
        CHART_DIR.mkdir(parents=True, exist_ok=True)

    def generate_visualizations(self, dataset: pd.DataFrame) -> dict:
        """
        Generate all visualizations.
        """

        charts = {
            "histogram": self._generate_histogram(dataset),
            "boxplot": self._generate_boxplot(dataset),
            "heatmap": self._generate_heatmap(dataset),
            "top_categories": self._generate_top_categories(dataset),
        }

        return charts

    # ==========================================================
    # Helper
    # ==========================================================

    def _get_best_numeric_column(self, dataset: pd.DataFrame) -> str:
        """
        Select the best business metric for visualization.
        """

        preferred = [
            "Total Revenue",
            "Total Profit",
            "Units Sold",
            "Unit Price",
        ]

        numeric = dataset.select_dtypes(include="number").columns.tolist()

        for col in preferred:
            if col in numeric:
                return col

        if not numeric:
            raise ValueError("No numeric columns found.")

        return numeric[0]

    # ==========================================================
    # Histogram
    # ==========================================================

    def _generate_histogram(self, dataset: pd.DataFrame) -> str:

        column = self._get_best_numeric_column(dataset)

        plt.figure(figsize=(8, 5))

        plt.hist(dataset[column], bins=15)

        plt.title(f"Distribution of {column}")

        plt.xlabel(column)

        plt.ylabel("Frequency")

        plt.tight_layout()

        chart_path = CHART_DIR / "histogram.png"

        plt.savefig(chart_path)

        plt.close()

        # Return URL for frontend
        return "/charts/histogram.png"

    # ==========================================================
    # Box Plot
    # ==========================================================

    def _generate_boxplot(self, dataset: pd.DataFrame) -> str:

        column = self._get_best_numeric_column(dataset)

        plt.figure(figsize=(8, 5))

        plt.boxplot(dataset[column])

        plt.title(f"Box Plot of {column}")

        plt.ylabel(column)

        plt.tight_layout()

        chart_path = CHART_DIR / "boxplot.png"

        plt.savefig(chart_path)

        plt.close()

        return "/charts/boxplot.png"

    # ==========================================================
    # Correlation Heatmap
    # ==========================================================

    def _generate_heatmap(self, dataset: pd.DataFrame) -> str:

        numeric = dataset.select_dtypes(include="number")

        corr = numeric.corr()

        plt.figure(figsize=(8, 6))

        plt.imshow(corr, cmap="coolwarm")

        plt.colorbar()

        plt.xticks(
            range(len(corr.columns)),
            corr.columns,
            rotation=90,
            fontsize=8,
        )

        plt.yticks(
            range(len(corr.columns)),
            corr.columns,
            fontsize=8,
        )

        plt.title("Correlation Heatmap")

        plt.tight_layout()

        chart_path = CHART_DIR / "heatmap.png"

        plt.savefig(chart_path)

        plt.close()

        return "/charts/heatmap.png"

    # ==========================================================
    # Revenue by Category
    # ==========================================================

    def _generate_top_categories(self, dataset: pd.DataFrame):

        if (
            "Item Type" not in dataset.columns
            or "Total Revenue" not in dataset.columns
        ):
            return None

        revenue = (
            dataset.groupby("Item Type")["Total Revenue"]
            .sum()
            .sort_values(ascending=False)
            .head(10)
        )

        plt.figure(figsize=(10, 6))

        revenue.plot(kind="bar")

        plt.title("Top Revenue by Item Type")

        plt.xlabel("Item Type")

        plt.ylabel("Revenue")

        plt.xticks(rotation=45)

        plt.tight_layout()

        chart_path = CHART_DIR / "top_categories.png"

        plt.savefig(chart_path)

        plt.close()

        return "/charts/top_categories.png"