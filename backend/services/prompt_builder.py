def build_insight_prompt(
    dataset_summary: dict,
    cleaning_summary: dict,
    statistics_summary: dict,
) -> str:
    """
    Build a structured prompt for the Gemini Insight Agent.
    The model is instructed to return ONLY valid JSON.
    """

    prompt = f"""
You are an experienced Senior Data Analyst.

Your task is to analyze the dataset information provided below and generate professional business insights.

==========================
DATASET SUMMARY
==========================

Rows:
{dataset_summary["rows"]}

Columns:
{dataset_summary["columns"]}

Column Names:
{dataset_summary["column_names"]}

==========================
DATA CLEANING SUMMARY
==========================

Missing Values:
{cleaning_summary["missing_values"]}

Duplicate Rows:
{cleaning_summary["duplicate_rows"]}

Cleaning Recommendations:
{cleaning_summary["recommendations"]}

==========================
STATISTICAL SUMMARY
==========================

Numeric Summary:
{statistics_summary["numeric_summary"]}

Correlation Matrix:
{statistics_summary["correlation_matrix"]}

==========================

Return ONLY a valid JSON object.

Do NOT include:

- Markdown
- Triple backticks
- Explanations
- Any text outside the JSON object

The JSON must exactly follow this structure:

{{
    "executive_summary": "string",

    "key_insights": [
        "string",
        "string",
        "string",
        "string",
        "string"
    ],

    "interesting_trends": [
        "string",
        "string",
        "string"
    ],

    "data_quality_concerns": [
        "string",
        "string"
    ],

    "recommendations": [
        "string",
        "string",
        "string",
        "string",
        "string"
    ]
}}

Rules:

- Executive summary should be 3-5 sentences.
- Key insights should contain exactly 5 points.
- Recommendations should be practical and business-oriented.
- Do not invent information not present in the data.
- Base every insight on the supplied dataset statistics.
"""

    return prompt