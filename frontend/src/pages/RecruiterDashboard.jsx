import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import CandidateTable from "../components/CandidateTable";
import CandidateModal from "../components/CandidateModal";
import Analytics from "../components/Analytics";
import ExportButtons from "../components/ExportButtons";
import Charts from "../components/Charts";

function RecruiterDashboard() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    // ===========================
    // States
    // ===========================

    const [file, setFile] = useState(null);

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [sortDescending, setSortDescending] = useState(true);

    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // ===========================
    // Logout
    // ===========================

    const logout = () => {

        localStorage.clear();

        navigate("/");

    };

    // ===========================
    // Analyze Job Description
    // ===========================

    const analyzeCandidates = async () => {

        if (!file) {

            toast.error("Please upload a Job Description PDF.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            setLoading(true);

            const response = await api.post(

                "/recruiter/upload-job-description-ai",

                formData,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            setResults(response.data.candidates);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed to analyze candidates.");

        }

        finally {

            setLoading(false);

        }

    };

    // ===========================
    // View Candidate Details
    // ===========================

    const viewCandidate = async (resumeId) => {

        try {

            const response = await api.get(

                `/recruiter/candidate/${resumeId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            setSelectedCandidate(response.data);

            setShowModal(true);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load candidate details.");

        }

    };

    // ===========================
    // Shortlist Candidate
    // ===========================

    const shortlistCandidate = async (resumeId) => {

        try {

            await api.post(

                `/recruiter/shortlist/${resumeId}`,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            setResults(

                results.map(candidate =>

                    candidate.resume_id === resumeId

                        ? {

                            ...candidate,

                            shortlisted: true,

                            suggested_shortlist: true

                        }

                        : candidate

                )

            );

            if (selectedCandidate) {

                setSelectedCandidate({

                    ...selectedCandidate,

                    shortlisted: true

                });

            }

          toast.success("Candidate shortlisted")

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to shortlist candidate.");

        }

    };
   const downloadResume = async (resumeId) => {

    try {

        const response = await api.get(

            `/recruiter/download-resume/${resumeId}`,

            {

                responseType: "blob",

                headers: {

                    Authorization: `Bearer ${localStorage.getItem("token")}`

                }

            }

        );

        const url = window.URL.createObjectURL(

            new Blob([response.data])

        );

        const link = document.createElement("a");

        link.href = url;

        link.download = `Resume_${resumeId}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to download resume.");

    }

};


const deleteResume = async (resumeId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {

        await api.delete(

            `/recruiter/delete-resume/${resumeId}`,

            {

                headers: {

                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                }

            }

        );

        setResults(

            results.filter(

                candidate => candidate.resume_id !== resumeId

            )

        );

       toast.success("Resume deleted")

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to delete resume.");

    }

};
    return (

        <div className="min-h-screen bg-slate-100">

        

            {/* ================= Navbar ================= */}

            <Navbar
                title="Recruiter Dashboard"
                subtitle="AI Resume Screening System"
                email={email}
                color="green"
                onLogout={logout}
            />

            {/* ================= Main Container ================= */}

            <div className="max-w-7xl mx-auto p-8">

                {/* ================= Upload Card ================= */}

                <div className="bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-3xl font-bold">

                        Upload Job Description

                    </h2>

                    <p className="text-gray-500 mt-2">

                        Upload a Job Description PDF and let AI rank every candidate automatically.

                    </p>

                    <div className="mt-8">

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <button

                        onClick={analyzeCandidates}

                        disabled={loading}

                        className="mt-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white px-8 py-3 rounded-lg transition"

                    >

                        {

                            loading

                                ? "Analyzing Candidates..."

                                : "Analyze Candidates"

                        }

                    </button>

                </div>

                {/* ================= Dashboard Stats ================= */}

                {

                    results.length > 0 && (

                        <>

                            <div className="mt-8">

                                <DashboardStats
                                    results={results}
                                />

                            </div>  
                            <Analytics
                                results={results}
                            />    
                            <Charts
                                results={results}
                            />
                            <div className="mt-8 flex justify-end">

                                <ExportButtons
                                    results={results}
                                />

                            </div>


                             {/* ================= Candidate Table ================= */}
                               <CandidateTable
                                    results={results}
                                    search={search}
                                    setSearch={setSearch}
                                    sortDescending={sortDescending}
                                    setSortDescending={setSortDescending}
                                    viewCandidate={viewCandidate}
                                    shortlistCandidate={shortlistCandidate}
                                    downloadResume={downloadResume}
                                    deleteResume={deleteResume}
                                />


                            {/* ================= Candidate Details ================= */}

                            <CandidateModal

                                show={showModal}

                                candidate={selectedCandidate}

                                onClose={() => {

                                    setShowModal(false);

                                    setSelectedCandidate(null);

                                }}

                                onShortlist={shortlistCandidate}

                            />                        </>

                    )

                }

            </div>

        </div>

    );

}

export default RecruiterDashboard;