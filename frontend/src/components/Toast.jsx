function Analytics({ results }) {

    // ==========================
    // Basic Statistics
    // ==========================

    const totalCandidates = results.length;

    const strongMatches = results.filter(
        candidate => candidate.ai_match_percentage >= 80
    ).length;

    const moderateMatches = results.filter(
        candidate =>
            candidate.ai_match_percentage >= 60 &&
            candidate.ai_match_percentage < 80
    ).length;

    const weakMatches = results.filter(
        candidate => candidate.ai_match_percentage < 60
    ).length;

    const averageMatch = totalCandidates
        ? (
            results.reduce(
                (sum, candidate) =>
                    sum + candidate.ai_match_percentage,
                0
            ) / totalCandidates
        ).toFixed(1)
        : 0;

    const highestMatch = totalCandidates
        ? Math.max(
            ...results.map(
                candidate => candidate.ai_match_percentage
            )
        )
        : 0;

    // ==========================
    // Skill Analysis
    // ==========================

    const skillFrequency = {};

    results.forEach(candidate => {

        candidate.matched_skills.forEach(skill => {

            skillFrequency[skill] =
                (skillFrequency[skill] || 0) + 1;

        });

    });

    const topSkills = Object.entries(skillFrequency)

        .sort((a, b) => b[1] - a[1])

        .slice(0, 8);

    // ==========================
    // AI Hiring Insight
    // ==========================

    let insight = "";

    if (strongMatches >= 5) {

        insight =
            "Excellent talent pool. Multiple candidates satisfy the Job Description.";

    }

    else if (strongMatches >= 2) {

        insight =
            "Good candidate pool. Recruiter should interview top-ranked candidates.";

    }

    else if (moderateMatches >= 3) {

        insight =
            "Moderate talent pool. Consider relaxing some mandatory skills.";

    }

    else {

        insight =
            "Very limited matching candidates. Consider revising the Job Description.";

    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

            <h2 className="text-3xl font-bold">

                Recruitment Analytics

            </h2>

            <p className="text-gray-500 mt-2">

                AI-generated hiring insights based on all analyzed resumes.

            </p>
                        {/* ========================================= */}
            {/* Statistics Cards */}
            {/* ========================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                <div className="bg-blue-600 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Total Candidates

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {totalCandidates}

                    </p>

                </div>

                <div className="bg-green-600 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Strong Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {strongMatches}

                    </p>

                </div>

                <div className="bg-yellow-500 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Moderate Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {moderateMatches}

                    </p>

                </div>

                <div className="bg-red-500 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Weak Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {weakMatches}

                    </p>

                </div>

                <div className="bg-purple-600 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Average Match

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {averageMatch}%

                    </p>

                </div>

                <div className="bg-indigo-600 rounded-xl text-white p-6 shadow">

                    <h3 className="text-lg">

                        Highest Match

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {highestMatch}%

                    </p>

                </div>

            </div>
                        {/* ========================================= */}
            {/* Top Skills & AI Insight */}
            {/* ========================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

                {/* Top Skills */}

                <div className="bg-slate-50 rounded-xl border p-6">

                    <h3 className="text-2xl font-bold text-blue-700">

                        🔥 Top Matching Skills

                    </h3>

                    <p className="text-gray-500 mt-2">

                        Most frequently matched skills across all analyzed candidates.

                    </p>

                    <div className="flex flex-wrap gap-3 mt-6">

                        {

                            topSkills.length > 0

                                ?

                                topSkills.map(([skill, count], index) => (

                                    <div

                                        key={index}

                                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"

                                    >

                                        {skill}

                                        <span className="ml-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">

                                            {count}

                                        </span>

                                    </div>

                                ))

                                :

                                <p className="text-gray-400">

                                    No matching skills found.

                                </p>

                        }

                    </div>

                </div>

                {/* AI Hiring Insight */}

                <div className="bg-green-50 rounded-xl border p-6">

                    <h3 className="text-2xl font-bold text-green-700">

                        🤖 AI Hiring Insight

                    </h3>

                    <p className="text-gray-500 mt-2">

                        Automatically generated recommendation based on candidate analysis.

                    </p>

                    <div className="mt-6 bg-white rounded-lg p-5 border">

                        <p className="leading-8 text-lg">

                            {insight}

                        </p>

                    </div>

                    <div className="mt-6">

                        <h4 className="font-bold text-lg">

                            Recommendation

                        </h4>

                        <ul className="list-disc ml-6 mt-3 space-y-2">

                            <li>

                                Interview candidates with AI Match above <strong>80%</strong>

                            </li>

                            <li>

                                Consider training candidates between <strong>60% - 80%</strong>

                            </li>

                            <li>

                                Reject or keep profiles below <strong>60%</strong> for future openings

                            </li>

                        </ul>

                    </div>

                </div>

            </div>
                    </div>

    );

}

export default Analytics;