import type { DatasetSummaryData } from "../types/analysis";
import Icon, { type IconName } from "./Icon";

interface Props {
  data: DatasetSummaryData;
}

export default function DatasetSummary({ data }: Props) {
  const metrics: { label: string; value: string; helper: string; icon: IconName; tone: string }[] = [
    {
      label: "Total rows",
      value: Number(data.rows ?? 0).toLocaleString(),
      helper: "Records in dataset",
      icon: "rows",
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total columns",
      value: Number(data.columns ?? 0).toLocaleString(),
      helper: "Dataset fields",
      icon: "columns",
      tone: "bg-violet-50 text-violet-700",
    },
    {
      label: "Numeric columns",
      value: String(data.numeric_columns?.length ?? 0),
      helper: "Quantitative fields",
      icon: "chart",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Categorical columns",
      value: String(data.categorical_columns?.length ?? 0),
      helper: "Text or category fields",
      icon: "layers",
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-eyebrow">DATASET OVERVIEW</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">At a glance</h2>
          <p className="mt-1 text-sm text-slate-500">A quick profile of your uploaded data.</p>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Analysis complete
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{metric.label}</span>
              <span className={`rounded-lg p-2 ${metric.tone}`}>
                <Icon name={metric.icon} size={18} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900">{metric.value}</p>
            <p className="mt-1 text-xs text-slate-400">{metric.helper}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-slate-800">Duplicate rows</p>
          <p className="text-xs text-slate-500">Repeated records detected in the dataset</p>
        </div>
        <span className={`rounded-lg px-3 py-1.5 text-sm font-bold ${
          Number(data.duplicate_rows) > 0
            ? "bg-amber-50 text-amber-700"
            : "bg-emerald-50 text-emerald-700"
        }`}>
          {Number(data.duplicate_rows ?? 0).toLocaleString()}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">Numeric fields</p>
          <div className="flex flex-wrap gap-2">
            {data.numeric_columns?.length ? data.numeric_columns.map((column) => (
              <span key={column} className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">{column}</span>
            )) : <span className="text-sm text-slate-400">No numeric fields reported.</span>}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">Categorical fields</p>
          <div className="flex flex-wrap gap-2">
            {data.categorical_columns?.length ? data.categorical_columns.map((column) => (
              <span key={column} className="rounded-lg bg-violet-50 px-2.5 py-1.5 text-xs font-medium text-violet-700">{column}</span>
            )) : <span className="text-sm text-slate-400">No categorical fields reported.</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
