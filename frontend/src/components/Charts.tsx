interface Props {
    charts: any;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function Charts({ charts }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8">

            <h2 className="text-3xl font-bold mb-6">
                Charts
            </h2>

            <div className="grid grid-cols-2 gap-8">

                <div>
                    <h3 className="font-semibold mb-2">Histogram</h3>

                    <img
                        src={`${API_URL}${charts.histogram}`}
                        alt="Histogram"
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Box Plot</h3>

                    <img
                        src={`${API_URL}${charts.boxplot}`}
                        alt="Box Plot"
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Heatmap</h3>

                    <img
                        src={`${API_URL}${charts.heatmap}`}
                        alt="Heatmap"
                        className="rounded-lg border"
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Revenue by Item Type</h3>

                    <img
                        src={`${API_URL}${charts.top_categories}`}
                        alt="Revenue"
                        className="rounded-lg border"
                    />
                </div>

            </div>

        </div>

    );

}