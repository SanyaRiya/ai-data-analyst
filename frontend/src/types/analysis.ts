export interface DatasetSummaryData {
  rows: number;
  columns: number;
  numeric_columns: string[];
  categorical_columns: string[];
  duplicate_rows: number;
}

export interface AIInsightsData {
  executive_summary: string;
  key_insights: string[];
  recommendations: string[];
}

export interface VisualizationSummary {
  histogram: string;
  boxplot: string;
  heatmap: string;
  top_categories: string;
}

export interface AnalysisResult {
  filename: string;
  dataset_summary: DatasetSummaryData;
  ai_insights: AIInsightsData;
  visualization_summary: VisualizationSummary;
  report_path: string;
}
