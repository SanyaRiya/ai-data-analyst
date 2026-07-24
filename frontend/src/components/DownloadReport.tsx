interface Props {
    reportPath: string;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function DownloadReport({ reportPath }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8 mb-10">

            <h2 className="text-3xl font-bold mb-5">
                Analysis Report
            </h2>

            <a
                href={`${API_URL}${reportPath}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Download PDF Report
            </a>

        </div>

    );

}