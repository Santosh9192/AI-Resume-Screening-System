function Analytics({ results }) {

    if (!results || results.length === 0) return null;

    const average =
        (
            results.reduce(
                (sum, candidate) => sum + candidate.ai_match_percentage,
                0
            ) / results.length
        ).toFixed(1);

    const highest = Math.max(
        ...results.map(candidate => candidate.ai_match_percentage)
    );

    const shortlisted = results.filter(
        candidate =>
            candidate.shortlisted ||
            candidate.suggested_shortlist
    ).length;

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-2xl font-bold">

                📈 AI Analytics

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                <div className="bg-blue-50 rounded-lg p-6">

                    <h3 className="text-lg font-semibold">

                        Average Match

                    </h3>

                    <p className="text-4xl font-bold text-blue-700 mt-3">

                        {average}%

                    </p>

                </div>

                <div className="bg-green-50 rounded-lg p-6">

                    <h3 className="text-lg font-semibold">

                        Highest Match

                    </h3>

                    <p className="text-4xl font-bold text-green-700 mt-3">

                        {highest}%

                    </p>

                </div>

                <div className="bg-purple-50 rounded-lg p-6">

                    <h3 className="text-lg font-semibold">

                        Shortlisted

                    </h3>

                    <p className="text-4xl font-bold text-purple-700 mt-3">

                        {shortlisted}

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Analytics;