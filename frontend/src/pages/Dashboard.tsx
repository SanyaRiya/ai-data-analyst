import { useState } from "react";

import UploadSection from "../components/UploadSection";
import DatasetSummary from "../components/DatasetSummary";
import AIInsights from "../components/AIInsights";
import Charts from "../components/Charts";
import DownloadReport from "../components/DownloadReport";

import { AnalysisResult } from "../types/analysis";

export default function Dashboard() {

    const [analysisResult, setAnalysisResult] =
        useState<AnalysisResult | null>(null);

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="max-w-7xl mx-auto p-10">

                <h1 className="text-5xl font-bold text-center text-blue-700">

                      AI Data Analyst Team

                </h1>

                <p className="text-center text-gray-600 mt-3">

                    Analyze datasets using Multi-Agent AI

                </p>

                <UploadSection
                    onAnalysisComplete={setAnalysisResult}
                />

                {analysisResult && (

                    <>

                        <DatasetSummary
                            data={analysisResult.dataset_summary}
                        />

                        <AIInsights
                            data={analysisResult.ai_insights}
                        />

                        <Charts
                            charts={analysisResult.visualization_summary}
                        />

                        <DownloadReport
                            reportPath={analysisResult.report_path}
                        />

                    </>

                )}

            </div>

        </div>

    );

}