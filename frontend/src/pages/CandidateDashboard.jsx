import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

function CandidateDashboard() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    // ===========================
    // States
    // ===========================

    const [file, setFile] = useState(null);

    const [result, setResult] = useState(null);

    const [loading, setLoading] = useState(false);

    const [targetRole, setTargetRole] = useState("Python Developer");

    // ===========================
    // Logout
    // ===========================

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    // ===========================
    // Upload Resume
    // ===========================

    const uploadResume = async () => {
              console.log("UPLOAD BUTTON CLICKED");
        if (!file) {
            toast.error("Please select a resume");

            return;

        }

        const formData = new FormData();

        formData.append("candidate_name", email);

        formData.append("target_role", targetRole);

        formData.append("file", file);

        try {

            setLoading(true);
            console.log("Calling API...");
            const response = await api.post(

                "/upload-resume",

                formData,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );
            console.log(response.data);
            setResult(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Resume upload failed.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100">

            {/* ================= NAVBAR ================= */}

            <nav className="bg-blue-700 text-white shadow-lg">

                <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                    <h1 className="text-3xl font-bold">

                        AI Resume Screening System

                    </h1>

                    <button

                        onClick={logout}

                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"

                    >

                        Logout

                    </button>

                </div>

            </nav>

            {/* ================= MAIN ================= */}

            <div className="max-w-7xl mx-auto p-8">

                {/* ================= Welcome Card ================= */}

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold">

                        Candidate Dashboard

                    </h2>

                    <p className="text-gray-600 mt-2">

                        Welcome

                        <span className="font-semibold ml-2">

                            {email}

                        </span>

                    </p>

                </div>

                {/* ================= Dashboard Cards ================= */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">

                        <h3>Resume Status</h3>

                        <p className="text-3xl font-bold mt-3">

                            {result ? "Uploaded" : "Pending"}

                        </p>

                    </div>

                    <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">

                        <h3>AI Score</h3>

                        <p className="text-3xl font-bold mt-3">

                            {result ? `${result.score}%` : "--"}

                        </p>

                    </div>

                    <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">

                        <h3>Skills Found</h3>

                        <p className="text-3xl font-bold mt-3">

                            {result ? result.skills_found.length : 0}

                        </p>

                    </div>

                    <div className="bg-red-500 text-white rounded-xl p-6 shadow-lg">

                        <h3>Missing Skills</h3>

                        <p className="text-3xl font-bold mt-3">

                            {result ? result.missing_skills.length : 0}

                        </p>

                    </div>

                </div>
      {/* ================= Resume Upload ================= */}

                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold">

                        Upload Your Resume

                    </h2>

                    <p className="text-gray-600 mt-2">

                        Upload your latest PDF resume for AI-powered analysis.

                    </p>
                    
                        {/* Target Job Role */}

                        <div className="mt-6">

                            <label className="block mb-2 font-semibold">

                                Target Job Role

                            </label>

                            <select

                                value={targetRole}

                                onChange={(e) => setTargetRole(e.target.value)}

                                className="w-full border rounded-lg p-3"

                            >

                                <option>Python Developer</option>

                                <option>Java Developer</option>

                                <option>Full Stack Developer</option>

                                <option>Frontend Developer</option>

                                <option>Backend Developer</option>

                                <option>Data Scientist</option>

                            </select>

                        </div>

                        {/* Resume Upload */}
                    <div className="mt-6">

                        <input

                            type="file"

                            accept=".pdf"

                            onChange={(e) => setFile(e.target.files[0])}

                            className="w-full border rounded-lg p-3"

                        />

                    </div>

                    {

                        file && (

                            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">

                                <p className="font-semibold">

                                    Selected Resume

                                </p>

                                <p className="text-gray-700 mt-1">

                                    {file.name}

                                </p>

                            </div>

                        )

                    }

                    <button

                        onClick={uploadResume}

                        disabled={loading}

                        className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white px-8 py-3 rounded-lg"

                    >

                        {

                            loading

                                ? "Uploading Resume..."

                                : "Upload Resume"

                        }

                    </button>

                </div>

                {/* ================= AI Analysis ================= */}

                {

                    result && (

                        <>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

                                {/* AI Score */}

                                <div className="bg-white rounded-xl shadow-lg p-6">

                                    <h2 className="text-2xl font-bold text-blue-700">

                                        🤖 AI Resume Analysis

                                    </h2>

                                    <div className="mt-8">

                                        <div className="w-full bg-gray-200 rounded-full h-5">

                                            <div

                                                className={`${

                                                    result.score >= 80

                                                        ? "bg-green-600"

                                                        : result.score >= 60

                                                        ? "bg-yellow-500"

                                                        : "bg-red-600"

                                                } h-5 rounded-full transition-all duration-700`}

                                                style={{

                                                    width: `${result.score}%`

                                                }}

                                            ></div>

                                        </div>

                                        <div className="flex justify-between mt-4">

                                            <span className="text-4xl font-bold">

                                                {result.score}%

                                            </span>

                                            <span className="text-xl font-bold">

                                                {

                                                    result.score >= 80

                                                        ? "Excellent"

                                                        : result.score >= 60

                                                        ? "Good"

                                                        : "Needs Improvement"

                                                }

                                            </span>

                                        </div>

                                    </div>

                                </div>

                                {/* ATS Compatibility */}

                                <div className="bg-white rounded-xl shadow-lg p-6">

                                    <h2 className="text-2xl font-bold text-green-700">

                                        📄 ATS Compatibility

                                    </h2>

                                    <div className="mt-10">

                                        {

                                            result.score >= 80

                                                ?

                                                <div className="text-3xl font-bold text-green-600">

                                                    ✅ ATS Friendly

                                                </div>

                                                :

                                                result.score >= 60

                                                    ?

                                                    <div className="text-3xl font-bold text-yellow-600">

                                                        ⚠ Moderate ATS Score

                                                    </div>

                                                    :

                                                    <div className="text-3xl font-bold text-red-600">

                                                        ❌ Needs Improvement

                                                    </div>

                                        }

                                    </div>

                                </div>

                            </div>
                         {/* ================= Resume Statistics ================= */}

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                                <div className="bg-white rounded-xl shadow-lg p-6">

                                    <h3 className="text-lg font-semibold text-gray-700">

                                        Resume ID

                                    </h3>

                                    <p className="text-3xl font-bold text-blue-600 mt-3">

                                        #{result.resume_id}

                                    </p>

                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">

                                    <h3 className="text-lg font-semibold text-gray-700">

                                        AI Score

                                    </h3>

                                    <p className="text-3xl font-bold text-green-600 mt-3">

                                        {result.score}%

                                    </p>

                                </div>

                                <div className="bg-white rounded-xl shadow-lg p-6">

                                    <h3 className="text-lg font-semibold text-gray-700">

                                        Skills Detected

                                    </h3>

                                    <p className="text-3xl font-bold text-purple-600 mt-3">

                                        {result.skills_found.length}

                                    </p>

                                </div>

                            </div>

                            {/* ================= Skills Section ================= */}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                                {/* Skills Found */}

                                <div className="bg-white rounded-xl shadow-lg p-8">

                                    <h2 className="text-2xl font-bold text-green-700 mb-6">

                                        ✅ Skills Found

                                    </h2>

                                    <div className="flex flex-wrap gap-3">

                                        {

                                            result.skills_found.length > 0

                                                ?

                                                result.skills_found.map(

                                                    (skill, index) => (

                                                        <span

                                                            key={index}

                                                            className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"

                                                        >

                                                            {skill}

                                                        </span>

                                                    )

                                                )

                                                :

                                                <p className="text-gray-500">

                                                    No skills detected.

                                                </p>

                                        }

                                    </div>

                                </div>

                                {/* Missing Skills */}

                                <div className="bg-white rounded-xl shadow-lg p-8">

                                    <h2 className="text-2xl font-bold text-red-700 mb-6">

                                        ❌ Missing Skills

                                    </h2>

                                    <div className="flex flex-wrap gap-3">

                                        {

                                            result.missing_skills.length > 0

                                                ?

                                                result.missing_skills.map(

                                                    (skill, index) => (

                                                        <span

                                                            key={index}

                                                            className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium"

                                                        >

                                                            {skill}

                                                        </span>

                                                    )

                                                )

                                                :

                                                <p className="text-green-600 font-semibold">

                                                    Excellent! No missing skills found.

                                                </p>

                                        }

                                    </div>

                                </div>

                            </div>

                            {/* ================= AI Recommendation ================= */}

                            <div className="mt-8">

                                    <h3 className="text-xl font-bold mb-3">

                                        ATS Recommendation

                                    </h3>

                                    <span

                                        className={`px-5 py-3 rounded-full font-semibold text-lg ${
                                            result.score >= 80
                                                ? "bg-green-100 text-green-700"
                                                : result.score >= 60
                                                ? "bg-blue-100 text-blue-700"
                                                : result.score >= 40
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}

                                    >

                                        {result.recommendation}

                                     </span>

                            </div>
                              {/* ================= AI Resume Feedback ================= */}

                                    <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                                        <h2 className="text-2xl font-bold text-indigo-700">

                                            🤖 AI Resume Feedback

                                        </h2>

                                        <p className="text-gray-600 mt-2">

                                            Personalized ATS feedback based on your selected job role.

                                        </p>

                                        <div className="mt-6 space-y-4">

                                            {

                                                result.feedback && result.feedback.length > 0

                                                    ? result.feedback.map((item, index) => (

                                                        <div

                                                            key={index}

                                                            className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-lg"

                                                        >

                                                            {item}

                                                        </div>

                                                    ))

                                                    : (

                                                        <p className="text-gray-500">

                                                            No AI feedback available.

                                                        </p>

                                                    )

                                            }

                                        </div>

                                    </div>
                            {/* ================= Success Banner ================= */}

                            <div className="bg-green-100 border border-green-300 rounded-xl p-6 mt-8">

                                <h2 className="text-2xl font-bold text-green-700">

                                    🎉 Resume Uploaded Successfully

                                </h2>

                                <p className="mt-3 text-green-700">

                                    Your resume has been analyzed successfully.

                                </p>

                                <p className="text-green-700">

                                    AI Score :

                                    <span className="font-bold ml-2">

                                        {result.score}%

                                    </span>

                                </p>

                            </div>

                        </>

                    )

                }

            </div>

        </div>

    );

}

export default CandidateDashboard;