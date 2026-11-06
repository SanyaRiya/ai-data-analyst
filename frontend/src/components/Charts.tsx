import { useState } from "react";
import type { VisualizationSummary } from "../types/analysis";
import Icon from "./Icon";

interface Props {
  charts: VisualizationSummary;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const chartItems: { key: keyof VisualizationSummary; title: string; description: string }[] = [
  { key: "histogram", title: "Distribution histogram", description: "Explore the distribution of numeric values." },
  { key: "boxplot", title: "Box plot", description: "Review spread and potential outliers." },
  { key: "heatmap", title: "Correlation heatmap", description: "Explore relationships between numeric fields." },
  { key: "top_categories", title: "Revenue by item type", description: "Compare category-level revenue." },
];

function chartUrl(path?: string) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export default function Charts({ charts }: Props) {
  const [failedImages, setFailedImages] = useState<string[]>([]);

  return (
    <section className="dashboard-card p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <p className="section-eyebrow">VISUAL EXPLORATION</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Visualizations</h2>
          <p className="mt-1 text-sm text-slate-500">Charts generated from your uploaded dataset.</p>
        </div>
        <span className="rounded-lg bg-blue-50 p-2 text-blue-700">
          <Icon name="chart" size={19} />
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {chartItems.map((item) => {
          const path = charts?.[item.key];
          const url = chartUrl(path);
          const failed = failedImages.includes(item.key);

          return (
            <article key={item.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-4 py-3">
                <h3 className="text-sm font-semibold text-slate-800">{item.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{item.description}</p>
              </div>
              <div className="flex min-h-56 items-center justify-center bg-slate-50 p-3 sm:min-h-64">
                {url && !failed ? (
                  <img
                    src={url}
                    alt={item.title}
                    loading="lazy"
                    onError={() => setFailedImages((current) => [...current, item.key])}
                    className="max-h-80 w-full rounded-lg object-contain"
                  />
                ) : (
                  <div className="px-4 text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                      <Icon name="chart" size={21} />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-600">
                      {failed ? "Chart image could not be loaded" : "No chart available"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {failed ? "Check that the backend is running and the image path is valid." : "The backend did not return an image for this chart."}
                    </p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
