import type { AIInsightsData } from "../types/analysis";
import Icon from "./Icon";

interface Props {
  data: AIInsightsData;
}

export default function AIInsights({ data }: Props) {
  const insights = data?.key_insights ?? [];
  const recommendations = data?.recommendations ?? [];

  return (
    <section className="dashboard-card overflow-hidden">
      <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50 via-white to-blue-50 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
            <Icon name="sparkles" size={21} />
          </div>
          <div>
            <p className="section-eyebrow text-violet-700">GENERATIVE AI ANALYSIS</p>
            <h2 className="text-xl font-bold text-slate-900">AI-powered insights</h2>
          </div>
          <span className="ml-auto hidden rounded-full border border-violet-200 bg-white/80 px-3 py-1 text-xs font-semibold text-violet-700 sm:inline-flex">
            Gemini generated
          </span>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Executive summary</h3>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
            {data?.executive_summary || "No executive summary was returned for this analysis."}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Key insights
            </h3>
            {insights.length ? (
              <ul className="mt-3 space-y-3">
                {insights.map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-blue-700">{index + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-slate-400">No key insights were returned.</p>}
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Recommendations
            </h3>
            {recommendations.length ? (
              <ul className="mt-3 space-y-3">
                {recommendations.map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-3 text-sm leading-6 text-slate-600">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
                      <Icon name="check" size={13} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : <p className="mt-3 text-sm text-slate-400">No recommendations were returned.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
