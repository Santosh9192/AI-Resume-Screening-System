import React from "react";

function CandidateModal({
    show,
    onClose,
    candidate,
    onShortlist
}) {

    if (!show || !candidate) return null;

    return (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-2xl w-11/12 max-w-5xl max-h-[90vh] overflow-y-auto">

                {/* Header */}

                <div className="flex justify-between items-center bg-blue-700 text-white px-8 py-5 rounded-t-xl">

                    <div>

                        <h2 className="text-3xl font-bold">
                            Candidate Profile
                        </h2>

                        <p className="text-blue-100 mt-1">
                            AI Resume Screening Report
                        </p>

                    </div>

                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-red-300"
                    >
                        ✕
                    </button>

                </div>

                {/* Body */}

                <div className="p-8">

                    {/* Candidate Info */}

                    <div className="grid md:grid-cols-2 gap-8">

                        <div className="bg-slate-100 rounded-xl p-6">

                            <h3 className="text-xl font-bold mb-5">
                                Candidate Information
                            </h3>

                            <div className="space-y-4">

                                <p>

                                    <strong>Resume ID :</strong>

                                    {" "}
                                    {candidate.resume_id}

                                </p>

                                <p>

                                    <strong>Candidate :</strong>

                                    {" "}
                                    {candidate.candidate_name}

                                </p>

                                <p>

                                    <strong>Resume :</strong>

                                    {" "}
                                    {candidate.file_name}

                                </p>

                                <p>

                                    <strong>Recommendation :</strong>

                                    {" "}

                                    <span
                                        className={
                                            candidate.recommendation ===
                                            "Strong Match"

                                                ? "text-green-600 font-bold"

                                                : candidate.recommendation ===
                                                  "Moderate Match"

                                                    ? "text-yellow-600 font-bold"

                                                    : "text-red-600 font-bold"
                                        }
                                    >

                                        {candidate.recommendation}

                                    </span>

                                </p>

                            </div>

                        </div>

                        {/* Score */}

                        <div className="bg-slate-100 rounded-xl p-6">

                            <h3 className="text-xl font-bold mb-5">
                                AI Resume Score
                            </h3>

                            <div className="w-full">

                                <div className="bg-gray-300 rounded-full h-5">

                                    <div
                                        className="bg-green-600 h-5 rounded-full"
                                        style={{
                                            width: `${candidate.score}%`
                                        }}
                                    />

                                </div>

                                <p className="text-center mt-4 text-3xl font-bold">

                                    {candidate.score}%

                                </p>

                            </div>

                        </div>

                    </div>                    {/* Skills Section */}

                    <div className="grid md:grid-cols-2 gap-8 mt-8">

                        {/* Skills Found */}

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6">

                            <h3 className="text-xl font-bold text-green-700 mb-5">

                                ✅ Skills Found

                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {candidate.skills_found &&
                                candidate.skills_found.length > 0 ? (

                                    candidate.skills_found.map((skill, index) => (

                                        <span
                                            key={index}
                                            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>

                                    ))

                                ) : (

                                    <p className="text-gray-500">

                                        No skills detected

                                    </p>

                                )}

                            </div>

                        </div>

                        {/* Missing Skills */}

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">

                            <h3 className="text-xl font-bold text-red-700 mb-5">

                                ❌ Missing Skills

                            </h3>

                            <div className="flex flex-wrap gap-3">

                                {candidate.missing_skills &&
                                candidate.missing_skills.length > 0 ? (

                                    candidate.missing_skills.map((skill, index) => (

                                        <span
                                            key={index}
                                            className="bg-red-500 text-white px-4 py-2 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>

                                    ))

                                ) : (

                                    <p className="text-gray-500">

                                        No missing skills

                                    </p>

                                )}

                            </div>

                        </div>

                    </div>

                    {/* Resume Preview */}

                    <div className="mt-8">

                        <div className="bg-slate-100 rounded-xl p-6">

                            <h3 className="text-xl font-bold mb-4">

                                📄 Resume Preview

                            </h3>

                            <div
                                className="bg-white border rounded-lg p-5 overflow-y-auto"
                                style={{
                                    maxHeight: "350px"
                                }}
                            >

                                <pre
                                    className="whitespace-pre-wrap text-sm leading-7"
                                >

                                    {candidate.extracted_text}

                                </pre>

                            </div>

                        </div>

                    </div>                    {/* Footer Buttons */}

                    <div className="flex justify-end gap-4 mt-8">

                        <button
                            onClick={() => onShortlist(candidate.resume_id)}
                            className={
                                candidate.shortlisted
                                    ? "bg-green-700 text-white px-6 py-3 rounded-lg"
                                    : "bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
                            }
                        >

                            {candidate.shortlisted
                                ? "⭐ Already Shortlisted"
                                : "⭐ Shortlist Candidate"}

                        </button>

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                        >
                            📥 Download Resume
                        </button>

                        <button
                            onClick={onClose}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CandidateModal;