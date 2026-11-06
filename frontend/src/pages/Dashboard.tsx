import { useState } from "react";
import UploadSection from "../components/UploadSection";
import DatasetSummary from "../components/DatasetSummary";
import AIInsights from "../components/AIInsights";
import Charts from "../components/Charts";
import DownloadReport from "../components/DownloadReport";
import Icon, { type IconName } from "../components/Icon";
import type { AnalysisResult } from "../types/analysis";

const navigation: { label: string; id: string; icon: IconName }[] = [
  { label: "Overview", id: "top", icon: "grid" },
  { label: "Upload dataset", id: "upload", icon: "upload" },
  { label: "Dataset profile", id: "dataset-profile", icon: "database" },
  { label: "Visualizations", id: "visualizations", icon: "chart" },
  { label: "AI insights", id: "ai-insights", icon: "sparkles" },
  { label: "Report", id: "report", icon: "file" },
];

export default function Dashboard() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeSection, setActiveSection] = useState("top");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startNewAnalysis = () => {
    setAnalysisResult(null);
    setActiveSection("upload");
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-900">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-600/20">
            <Icon name="sparkles" size={21} />
          </div>
          <div>
            <p className="text-sm font-extrabold tracking-tight text-slate-900">InsightAI</p>
            <p className="text-[11px] font-medium text-slate-400">DATA ANALYST TEAM</p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon name="x" />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Workspace</p>
          <nav className="mt-3 space-y-1">
            {navigation.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {activeSection === item.id && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-600" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-4 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-blue-200">
              <Icon name="shield" size={19} />
            </div>
            <p className="mt-3 text-sm font-semibold">Your data workspace</p>
            <p className="mt-1 text-xs leading-5 text-slate-300">Upload a dataset to generate an automated analysis with AI-powered insights.</p>
            <button
              type="button"
              onClick={startNewAnalysis}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-blue-50"
            >
              Start an analysis
              <Icon name="arrow-up-right" size={14} />
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-400">InsightAI · Analytics workspace</p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open navigation"
            >
              <Icon name="menu" />
            </button>
            <div>
              <p className="text-sm font-semibold text-slate-800">Analytics workspace</p>
              <p className="hidden text-[11px] text-slate-400 sm:block">AI-powered dataset exploration</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Workspace ready
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">AI</div>
          </div>
        </header>

        <main id="top" className="mx-auto max-w-[1440px] space-y-6 px-4 py-7 sm:px-7 sm:py-9">
          <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="section-eyebrow">YOUR DATA, UNDERSTOOD</p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                {analysisResult ? "Analysis workspace" : "Welcome to your analytics workspace"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {analysisResult
                  ? "Explore the dataset profile, visualizations and AI-generated findings below."
                  : "Turn raw data into clear insights. Upload a dataset and let your AI analyst team do the heavy lifting."}
              </p>
            </div>
            {analysisResult && (
              <button
                type="button"
                onClick={startNewAnalysis}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <Icon name="refresh" size={16} />
                New analysis
              </button>
            )}
          </section>

          <section id="upload" className="scroll-mt-24">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="section-eyebrow">GET STARTED</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">Upload a dataset</h2>
              </div>
              <span className="hidden rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm sm:inline-flex">
                CSV · XLSX · XLS
              </span>
            </div>
            <div className="dashboard-card p-4 sm:p-6">
              <UploadSection onAnalysisComplete={setAnalysisResult} />
            </div>
          </section>

          {!analysisResult ? (
            <>
              <section className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: "database" as IconName, title: "Understand your data", description: "Get a quick profile of rows, columns, field types and duplicate records.", tint: "bg-blue-50 text-blue-700" },
                  { icon: "chart" as IconName, title: "Explore visual patterns", description: "Review generated charts to spot distributions, relationships and outliers.", tint: "bg-violet-50 text-violet-700" },
                  { icon: "sparkles" as IconName, title: "Get AI recommendations", description: "Turn analysis results into a readable summary and actionable suggestions.", tint: "bg-emerald-50 text-emerald-700" },
                ].map((feature) => (
                  <article key={feature.title} className="dashboard-card p-5">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.tint}`}>
                      <Icon name={feature.icon} size={20} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
                  </article>
                ))}
              </section>

              <section className="dashboard-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-amber-50 p-2.5 text-amber-700">
                    <Icon name="clock" size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Your analysis will appear here</h3>
                    <p className="mt-1 text-sm text-slate-500">Once a dataset is processed, its summary, charts, AI insights and report will be displayed in this workspace.</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">Awaiting dataset</span>
              </section>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <Icon name="check" size={15} />
                  </span>
                  Dataset analyzed successfully
                </div>
                <p className="truncate text-xs text-emerald-700">File: {analysisResult.filename}</p>
              </div>

              <section id="dataset-profile" className="scroll-mt-24">
                <DatasetSummary data={analysisResult.dataset_summary} />
              </section>

              <section id="visualizations" className="scroll-mt-24">
                <Charts charts={analysisResult.visualization_summary} />
              </section>

              <section id="ai-insights" className="scroll-mt-24">
                <AIInsights data={analysisResult.ai_insights} />
              </section>

              <section id="report" className="scroll-mt-24">
                <DownloadReport reportPath={analysisResult.report_path} />
              </section>
            </>
          )}

          <footer className="border-t border-slate-200 py-5 text-center text-xs text-slate-400">
            InsightAI · AI Data Analyst Team
          </footer>
        </main>
      </div>
    </div>
  );
}
