function ResumeScoreCard({ score }) {

    if (score === undefined || score === null) return null;

    let color = "bg-red-500";
    let status = "Needs Improvement";

    if (score >= 80) {
        color = "bg-green-600";
        status = "Excellent Resume";
    }
    else if (score >= 60) {
        color = "bg-yellow-500";
        status = "Good Resume";
    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold text-blue-700">

                📊 Resume Score

            </h2>

            <div className="mt-8">

                <div className="w-full bg-gray-200 rounded-full h-5">

                    <div

                        className={`${color} h-5 rounded-full transition-all duration-700`}

                        style={{
                            width: `${score}%`
                        }}

                    ></div>

                </div>

                <div className="flex justify-between mt-4">

                    <h3 className="text-4xl font-bold">

                        {score}%

                    </h3>

                    <span
                        className="text-xl font-bold text-gray-700"
                    >

                        {status}

                    </span>

                </div>

            </div>

        </div>

    );

}

export default ResumeScoreCard;