from backend.agents.dataset_agent import DatasetUnderstandingAgent
from backend.agents.cleaning_agent import DataCleaningAgent
from backend.agents.statistics_agent import StatisticalAnalysisAgent
from backend.agents.visualization_agent import VisualizationAgent
from backend.agents.insight_agent import InsightGenerationAgent
from backend.agents.report_generator_agent import ReportGeneratorAgent

from backend.services.prompt_builder import build_insight_prompt


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
        dataset_summary = self.dataset_agent.analyze(dataset)
        cleaning_summary = self.cleaning_agent.analyze(dataset)
        statistics_summary = self.statistics_agent.analyze(dataset)
        charts = self.visualization_agent.generate_visualizations(dataset)

  
        prompt = build_insight_prompt(
            dataset_summary,
            cleaning_summary,
            statistics_summary,
        )

        # --------------------------
        # AI Insights
        # --------------------------
        ai_insights = self.insight_agent.generate(prompt)

        # --------------------------
        # Collect all results
        # --------------------------
        analysis_result = {
            "dataset_summary": dataset_summary,
            "cleaning_summary": cleaning_summary,
            "statistics_summary": statistics_summary,
            "visualization_summary": charts,
            "ai_insights": ai_insights,
        }

        # --------------------------
        # Generate PDF Report
        # --------------------------
        report_path = self.report_agent.generate_report(
            filename=filename,
            analysis_result=analysis_result,
        )

        analysis_result["report_path"] = "/reports/analysis_report.pdf"

        return analysis_result