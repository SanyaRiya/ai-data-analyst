interface Props {
    reportPath: string;
}

export default function DownloadReport({ reportPath }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8 mb-10">

            <h2 className="text-3xl font-bold mb-5">
                Analysis Report
            </h2>

            <a
                href={`http://127.0.0.1:8000${reportPath}`}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Download PDF Report
            </a>

        </div>

    );

}