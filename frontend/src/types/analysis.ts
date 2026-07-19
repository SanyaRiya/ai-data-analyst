export interface AnalysisResult {
  filename: string;

  dataset_summary: {
    rows: number;
    columns: number;
    numeric_columns: string[];
    categorical_columns: string[];
    duplicate_rows: number;
  };

  ai_insights: {
    executive_summary: string;
    key_insights: string[];
    recommendations: string[];
  };

  visualization_summary: {
    histogram: string;
    boxplot: string;
    heatmap: string;
    top_categories: string;
  };

  report_path: string;
}