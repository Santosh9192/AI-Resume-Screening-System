import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButtons({ results }) {

    // ===============================
    // Export Excel
    // ===============================

    const exportExcel = () => {

        if (results.length === 0) {

            toast("No candidate data available.");

            return;

        }

        const excelData = results.map(candidate => ({

            Candidate: candidate.candidate_name,

            "AI Match %": candidate.ai_match_percentage,

            Recommendation: candidate.recommendation,

            "Matched Skills": candidate.matched_skills.join(", "),

            "Missing Skills": candidate.missing_skills.join(", "),

            Shortlisted:

                candidate.shortlisted ||

                candidate.suggested_shortlist

                    ? "Yes"

                    : "No"

        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Candidates"

        );

        const excelBuffer = XLSX.write(

            workbook,

            {

                bookType: "xlsx",

                type: "array"

            }

        );

        const file = new Blob(

            [excelBuffer],

            {

                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

            }

        );

        saveAs(

            file,

            "Candidate_Ranking.xlsx"

        );

    };
       // ===============================
// Export PDF
// ===============================

const exportPDF = async () => {

    if (results.length === 0) {

        toast.error("No candidate data available.");

        return;

    }

    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Resume Screening Report", 14, 18);

    doc.setFontSize(11);
    doc.text(
        `Generated on: ${new Date().toLocaleString()}`,
        14,
        26
    );

    const tableData = results.map(candidate => [

        candidate.candidate_name,

        `${candidate.ai_match_percentage}%`,

        candidate.recommendation,

        candidate.matched_skills.join(", "),

        candidate.shortlisted || candidate.suggested_shortlist
            ? "Yes"
            : "No"

    ]);

    autoTable(doc, {

        startY: 35,

        head: [[

            "Candidate",

            "Match %",

            "Recommendation",

            "Matched Skills",

            "Shortlisted"

        ]],

        body: tableData,

        styles: {

            fontSize: 9,

            cellPadding: 2

        },

        headStyles: {

            fillColor: [22, 160, 133]

        }

    });

    doc.save("Candidate_Ranking_Report.pdf");

};
        return (

        <div className="flex flex-wrap gap-4">

            <button

                onClick={exportExcel}

                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"

            >

                📊 Export Excel

            </button>

            <button

                onClick={exportPDF}

                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg shadow"

            >

                📄 Export PDF

            </button>

        </div>

    );

}

export default ExportButtons;