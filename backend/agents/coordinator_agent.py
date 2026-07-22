from agents.dataset_agent import DatasetUnderstandingAgent
from agents.cleaning_agent import DataCleaningAgent
from agents.statistics_agent import StatisticalAnalysisAgent
from agents.visualization_agent import VisualizationAgent
from agents.insight_agent import InsightGenerationAgent
from agents.report_generator_agent import ReportGeneratorAgent

from services.prompt_builder import build_insight_prompt


class CoordinatorAgent:
    """
    Coordinates all AI agents.
    """

    def __init__(self):
        self.dataset_agent = DatasetUnderstandingAgent()
        self.cleaning_agent = DataCleaningAgent()
        self.statistics_agent = StatisticalAnalysisAgent()
        self.visualization_agent = VisualizationAgent()
        self.insight_agent = InsightGenerationAgent()
        self.report_agent = ReportGeneratorAgent()

    def run(self, dataset, filename):
        # Dataset Understanding
        dataset_summary = self.dataset_agent.analyze(dataset)

        # Data Cleaning
        cleaning_summary = self.cleaning_agent.analyze(dataset)

        # Statistics
        statistics_summary = self.statistics_agent.analyze(dataset)

        # Visualizations
        charts = self.visualization_agent.generate_visualizations(dataset)

        # Build prompt for Gemini
        prompt = build_insight_prompt(
            dataset_summary,
            cleaning_summary,
            statistics_summary,
        )

        # Generate AI Insights
        ai_insights = self.insight_agent.generate(prompt)

        # Collect all analysis results
        analysis_result = {
            "dataset_summary": dataset_summary,
            "cleaning_summary": cleaning_summary,
            "statistics_summary": statistics_summary,
            "visualization_summary": charts,
            "ai_insights": ai_insights,
        }

        # Generate PDF report
        self.report_agent.generate_report(
            filename=filename,
            analysis_result=analysis_result,
        )

        # URL for frontend
        analysis_result["report_path"] = "/reports/analysis_report.pdf"

        return analysis_result