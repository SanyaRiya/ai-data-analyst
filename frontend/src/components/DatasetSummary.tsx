interface Props {
    data: any;
}

export default function DatasetSummary({ data }: Props) {

    return (

        <div className="bg-white rounded-xl shadow p-8 mt-8">

            <h2 className="text-3xl font-bold mb-5">

                Dataset Summary

            </h2>

            <div className="grid grid-cols-2 gap-6">

                <div>

                    <b>Rows</b>

                    <p>{data.rows}</p>

                </div>

                <div>

                    <b>Columns</b>

                    <p>{data.columns}</p>

                </div>

                <div>

                    <b>Numeric Columns</b>

                    <p>{data.numeric_columns.length}</p>

                </div>

                <div>

                    <b>Categorical Columns</b>

                    <p>{data.categorical_columns.length}</p>

                </div>

                <div>

                    <b>Duplicate Rows</b>

                    <p>{data.duplicate_rows}</p>

                </div>

            </div>

        </div>

    );

}