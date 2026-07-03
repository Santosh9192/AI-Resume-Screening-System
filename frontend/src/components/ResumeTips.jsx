function ResumeTips({ result }) {

    if (!result) return null;

    const tips = [];

    if (result.score < 40) {

        tips.push("Add more technical skills relevant to your desired job role.");
        tips.push("Include internships, academic projects, or certifications.");
        tips.push("Use ATS-friendly keywords from the job description.");
        tips.push("Improve formatting and avoid unnecessary graphics.");

    }

    else if (result.score < 70) {

        tips.push("Add measurable achievements in your projects.");
        tips.push("Include GitHub and LinkedIn profile links.");
        tips.push("Mention frameworks and tools you've used.");
        tips.push("Tailor your resume for each job application.");

    }

    else {

        tips.push("Excellent resume! Your profile matches many ATS requirements.");
        tips.push("Customize your resume according to the job description.");
        tips.push("Continue adding new projects and certifications.");
        tips.push("Keep your GitHub repositories updated.");

    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold text-blue-700">

                🤖 AI Resume Suggestions

            </h2>

            <p className="text-gray-500 mt-2">

                Personalized recommendations generated from your resume analysis.

            </p>

            <div className="mt-6 space-y-3">

                {

                    tips.map((tip, index) => (

                        <div

                            key={index}

                            className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded"

                        >

                            ✅ {tip}

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ResumeTips;