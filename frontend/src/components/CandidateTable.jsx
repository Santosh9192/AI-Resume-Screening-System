function CandidateTable({

    results,

    search,

    setSearch,

    sortDescending,

    setSortDescending,

    viewCandidate,

    shortlistCandidate,

    downloadResume,

    deleteResume

}) {

    // ===========================
    // Filter Candidates
    // ===========================

    const filteredCandidates = results

        .filter(candidate =>

            candidate.candidate_name

                ?.toLowerCase()

                .includes(search.toLowerCase())

        )

        .sort((a, b) =>

            sortDescending

                ? b.ai_match_percentage - a.ai_match_percentage

                : a.ai_match_percentage - b.ai_match_percentage

        );

    return (

        <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

            {/* ================= Toolbar ================= */}

            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

                <h2 className="text-2xl font-bold">

                    AI Candidate Ranking

                </h2>

                <div className="flex flex-wrap gap-3">

                    <input

                        type="text"

                        placeholder="Search Candidate..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                        className="border rounded-lg px-4 py-2 w-72"

                    />

                    <button

                        onClick={() =>

                            setSortDescending(

                                !sortDescending

                            )

                        }

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                    >

                        Sort

                        {

                            sortDescending

                                ? " ↓"

                                : " ↑"

                        }

                    </button>

                </div>

            </div>

            {/* ================= Table ================= */}

            <div className="overflow-x-auto">

                <table className="min-w-full border border-gray-300">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="border p-3">

                                Candidate

                            </th>

                            <th className="border p-3">

                                AI Match

                            </th>

                            <th className="border p-3">

                                Recommendation

                            </th>

                            <th className="border p-3">

                                Skills Found

                            </th>

                            <th className="border p-3">

                                Missing Skills

                            </th>

                            <th className="border p-3">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>
                                                {

                            filteredCandidates.map((candidate) => (

                                <tr
                                    key={candidate.resume_id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    {/* Candidate */}

                                    <td className="border p-3 font-semibold">

                                        {candidate.candidate_name}

                                    </td>

                                    {/* AI Match */}

                                    <td className="border p-3">

                                        <div className="w-44">

                                            <div className="bg-gray-200 rounded-full h-3">

                                                <div

                                                    className={
                                                        candidate.ai_match_percentage >= 80

                                                            ? "bg-green-600 h-3 rounded-full"

                                                            : candidate.ai_match_percentage >= 60

                                                                ? "bg-yellow-500 h-3 rounded-full"

                                                                : "bg-red-500 h-3 rounded-full"
                                                    }

                                                    style={{
                                                        width: `${candidate.ai_match_percentage}%`
                                                    }}

                                                />

                                            </div>

                                            <p className="mt-2 text-sm font-semibold">

                                                {candidate.ai_match_percentage}%

                                            </p>

                                        </div>

                                    </td>

                                    {/* Recommendation */}

                                    <td className="border p-3">

                                        <span

                                            className={

                                                candidate.recommendation === "Strong Match"

                                                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold"

                                                    : candidate.recommendation === "Moderate Match"

                                                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold"

                                                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold"

                                            }

                                        >

                                            {candidate.recommendation}

                                        </span>

                                    </td>

                                    {/* Skills Found */}

                                    <td className="border p-3">

                                        <div className="flex flex-wrap gap-2">

                                            {

                                                candidate.matched_skills.length > 0

                                                    ?

                                                    candidate.matched_skills.map((skill, index) => (

                                                        <span

                                                            key={index}

                                                            className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"

                                                        >

                                                            {skill}

                                                        </span>

                                                    ))

                                                    :

                                                    <span className="text-gray-400">

                                                        None

                                                    </span>

                                            }

                                        </div>

                                    </td>

                                    {/* Missing Skills */}

                                    <td className="border p-3">

                                        <div className="flex flex-wrap gap-2">

                                            {

                                                candidate.missing_skills.length > 0

                                                    ?

                                                    candidate.missing_skills.map((skill, index) => (

                                                        <span

                                                            key={index}

                                                            className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm"

                                                        >

                                                            {skill}

                                                        </span>

                                                    ))

                                                    :

                                                    <span className="text-gray-400">

                                                        None

                                                    </span>

                                            }

                                        </div>

                                    </td>

                                    {/* Actions */}
                                                                        <td className="border p-3">

                                        <div className="flex flex-col gap-2">

                                            {/* View Details */}

                                            <button

                                                onClick={() =>
                                                    viewCandidate(candidate.resume_id)
                                                }

                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"

                                            >

                                                👁 View Details

                                            </button>

                                            {/* Download Resume */}

                                            <button

                                                onClick={() =>
                                                    downloadResume(candidate.resume_id)
                                                }

                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"

                                            >

                                                📥 Download Resume

                                            </button>
                                            <button

                                                onClick={() => deleteResume(candidate.resume_id)}

                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"

                                            >

                                                Delete

                                            </button>
                                            {/* Shortlist */}

                                            {

                                                candidate.shortlisted ||

                                                candidate.suggested_shortlist

                                                    ?

                                                    <button

                                                        disabled

                                                        className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"

                                                    >

                                                        ✅ Shortlisted

                                                    </button>

                                                    :

                                                    <button

                                                        onClick={() =>
                                                            shortlistCandidate(candidate.resume_id)
                                                        }

                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"

                                                    >

                                                        ⭐ Shortlist

                                                    </button>

                                            }

                                        </div>

                                    </td>

                                </tr>

                            ))

                        }
                                                {

                            filteredCandidates.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="border p-8 text-center text-gray-500"
                                    >

                                        <div className="flex flex-col items-center gap-2">

                                            <span className="text-5xl">
                                                📂
                                            </span>

                                            <h3 className="text-xl font-semibold">

                                                No Candidates Found

                                            </h3>

                                            <p>

                                                Try changing the search keyword or upload another Job Description.

                                            </p>

                                        </div>

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default CandidateTable;