import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

function Charts({ results }) {

    // ==========================
    // Match Distribution
    // ==========================

    const strongMatches = results.filter(
        c => c.ai_match_percentage >= 80
    ).length;

    const moderateMatches = results.filter(
        c =>
            c.ai_match_percentage >= 60 &&
            c.ai_match_percentage < 80
    ).length;

    const weakMatches = results.filter(
        c => c.ai_match_percentage < 60
    ).length;

    const pieData = [

        {
            name: "Strong",
            value: strongMatches
        },

        {
            name: "Moderate",
            value: moderateMatches
        },

        {
            name: "Weak",
            value: weakMatches
        }

    ];

    // ==========================
    // Top Skills
    // ==========================

    const skillCount = {};

    results.forEach(candidate => {

        candidate.matched_skills.forEach(skill => {

            skillCount[skill] =
                (skillCount[skill] || 0) + 1;

        });

    });

    const barData = Object.entries(skillCount)

        .map(([skill, count]) => ({

            skill,

            count

        }))

        .sort((a, b) => b.count - a.count)

        .slice(0, 8);

    // ==========================
    // Chart Colors
    // ==========================

    const COLORS = [

        "#16a34a",

        "#eab308",

        "#dc2626"

    ];

    return (

        <div className="bg-white rounded-xl shadow-lg mt-8 p-8">

            <h2 className="text-3xl font-bold">

                Recruitment Charts

            </h2>

            <p className="text-gray-500 mt-2">

                Visual analytics generated using AI candidate matching.

            </p>
                        {/* ======================================== */}
            {/* Charts Layout */}
            {/* ======================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

                {/* ================= Pie Chart ================= */}

                <div className="bg-slate-50 rounded-xl border p-6">

                    <h3 className="text-2xl font-bold text-center">

                        Candidate Match Distribution

                    </h3>

                    <div className="h-96 mt-6">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie

                                    data={pieData}

                                    dataKey="value"

                                    nameKey="name"

                                    cx="50%"

                                    cy="50%"

                                    outerRadius={120}

                                    label

                                >

                                    {

                                        pieData.map((entry, index) => (

                                            <Cell

                                                key={index}

                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }

                                            />

                                        ))

                                    }

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>
                                {/* ================= Bar Chart ================= */}

                <div className="bg-slate-50 rounded-xl border p-6">

                    <h3 className="text-2xl font-bold text-center">

                        Top Matching Skills

                    </h3>

                    <div className="h-96 mt-6">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <BarChart
                                data={barData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="skill"
                                />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="count"
                                    fill="#2563eb"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            {/* ================= Summary ================= */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                <div className="bg-green-100 rounded-xl p-6">

                    <h3 className="text-lg font-bold text-green-700">

                        Strong Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {strongMatches}

                    </p>

                </div>

                <div className="bg-yellow-100 rounded-xl p-6">

                    <h3 className="text-lg font-bold text-yellow-700">

                        Moderate Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {moderateMatches}

                    </p>

                </div>

                <div className="bg-red-100 rounded-xl p-6">

                    <h3 className="text-lg font-bold text-red-700">

                        Weak Matches

                    </h3>

                    <p className="text-4xl font-bold mt-3">

                        {weakMatches}

                    </p>

                </div>

            </div>
                    </div>

    );

}

export default Charts;