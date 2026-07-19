interface Props {
    data: any;
}

export default function AIInsights({ data }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8">

            <h2 className="text-3xl font-bold mb-5">

                AI Insights

            </h2>

            <h3 className="text-xl font-semibold mb-2">

                Executive Summary

            </h3>

            <p>{data.executive_summary}</p>

            <h3 className="text-xl font-semibold mt-6">

                Key Insights

            </h3>

            <ul className="list-disc pl-6">

                {data.key_insights.map((item: string, index: number) => (

                    <li key={index}>{item}</li>

                ))}

            </ul>

            <h3 className="text-xl font-semibold mt-6">

                Recommendations

            </h3>

            <ul className="list-disc pl-6">

                {data.recommendations.map((item: string, index: number) => (

                    <li key={index}>{item}</li>

                ))}

            </ul>

        </div>

    );

}