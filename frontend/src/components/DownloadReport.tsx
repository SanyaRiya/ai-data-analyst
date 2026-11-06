import Icon from "./Icon";

interface Props {
  reportPath: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function reportUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export default function DownloadReport({ reportPath }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-200">
            <Icon name="file" size={24} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">Ready to share</p>
            <h2 className="mt-1 text-lg font-bold">Your analysis report is ready</h2>
            <p className="mt-1 text-sm text-slate-300">Download the generated PDF summary of this analysis.</p>
          </div>
        </div>
        {reportPath ? (
          <a
            href={reportUrl(reportPath)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
          >
            <Icon name="download" size={17} />
            Download PDF
          </a>
        ) : (
          <span className="text-sm text-slate-400">No report path was returned.</span>
        )}
      </div>
    </section>
  );
}
