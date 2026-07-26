from pathlib import Path

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
)


class ReportGeneratorAgent:
    """
    Generates a professional PDF report from the analysis results.
    """

    def __init__(self):

        self.report_dir = Path("reports")
        self.report_dir.mkdir(parents=True, exist_ok=True)

    def generate_report(self, filename: str, analysis_result: dict):

        pdf_path = self.report_dir / "analysis_report.pdf"

        document = SimpleDocTemplate(str(pdf_path))

        styles = getSampleStyleSheet()

        story = []

        # =====================================================
        # Title
        # =====================================================

        story.append(
            Paragraph(
                "<b><font size=20>AI Data Analysis Report</font></b>",
                styles["Title"],
            )
        )

        story.append(Spacer(1, 20))

        # =====================================================
        # Dataset Summary
        # =====================================================

        dataset = analysis_result["dataset_summary"]

        story.append(
            Paragraph("<b>Dataset Summary</b>", styles["Heading2"])
        )

        story.append(
            Paragraph(f"Filename: {filename}", styles["BodyText"])
        )

        story.append(
            Paragraph(f"Rows: {dataset['rows']}", styles["BodyText"])
        )

        story.append(
            Paragraph(f"Columns: {dataset['columns']}", styles["BodyText"])
        )

        story.append(Spacer(1, 20))

        # =====================================================
        # Data Visualizations
        # =====================================================

        story.append(
            Paragraph("<b>Data Visualizations</b>", styles["Heading2"])
        )

        charts = analysis_result.get("visualization_summary", {})

        chart_titles = {
            "histogram": "Histogram",
            "boxplot": "Box Plot",
            "heatmap": "Correlation Heatmap",
            "top_categories": "Top Revenue by Item Type",
        }

        for key, title in chart_titles.items():

            chart_path = charts.get(key)

            if chart_path:

                # Convert frontend URL to local filesystem path
                local_chart_path = Path(chart_path.lstrip("/"))

                if local_chart_path.exists():

                    story.append(
                        Paragraph(
                            f"<b>{title}</b>",
                            styles["Heading3"],
                        )
                    )

                    story.append(
                        Image(
                            str(local_chart_path),
                            width=450,
                            height=280,
                        )
                    )

                    story.append(Spacer(1, 20))

        # =====================================================
        # Executive Summary
        # =====================================================

        insights = analysis_result["ai_insights"]

        story.append(
            Paragraph("<b>Executive Summary</b>", styles["Heading2"])
        )

        story.append(
            Paragraph(
                insights["executive_summary"],
                styles["BodyText"],
            )
        )

        story.append(Spacer(1, 20))

        # =====================================================
        # Key Business Insights
        # =====================================================

        story.append(
            Paragraph("<b>Key Business Insights</b>", styles["Heading2"])
        )

        for insight in insights["key_insights"]:

            story.append(
                Paragraph(
                    f"• {insight}",
                    styles["BodyText"],
                )
            )

        story.append(Spacer(1, 20))

        # =====================================================
        # Recommendations
        # =====================================================

        story.append(
            Paragraph("<b>Recommendations</b>", styles["Heading2"])
        )

        for recommendation in insights["recommendations"]:

            story.append(
                Paragraph(
                    f"• {recommendation}",
                    styles["BodyText"],
                )
            )

        document.build(story)

        return str(pdf_path)