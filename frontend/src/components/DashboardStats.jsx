import {
    Users,
    Star,
    TrendingUp,
    Award
} from "lucide-react";

function DashboardStats({ results }) {

    const totalCandidates = results.length;

    const shortlisted = results.filter(
        candidate => candidate.shortlisted
    ).length;

    const strongMatches = results.filter(
        candidate => candidate.ai_match_percentage >= 70
    ).length;

    const averageMatch =

        totalCandidates > 0

            ? (

                results.reduce(

                    (sum, candidate) =>

                        sum + candidate.ai_match_percentage,

                    0

                ) / totalCandidates

            ).toFixed(1)

            : 0;

    const cards = [

        {

            title: "Total Candidates",

            value: totalCandidates,

            icon: Users,

            color: "bg-blue-600"

        },

        {

            title: "Shortlisted",

            value: shortlisted,

            icon: Star,

            color: "bg-green-600"

        },

        {

            title: "Average Match",

            value: `${averageMatch}%`,

            icon: TrendingUp,

            color: "bg-purple-600"

        },

        {

            title: "Strong Matches",

            value: strongMatches,

            icon: Award,

            color: "bg-orange-500"

        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <div

                            key={index}

                            className={`${card.color} rounded-xl shadow-lg text-white p-6 hover:scale-105 transition duration-300`}

                        >

                            <div className="flex justify-between items-center">

                                <div>

                                    <p className="text-sm opacity-90">

                                        {card.title}

                                    </p>

                                    <h2 className="text-4xl font-bold mt-3">

                                        {card.value}

                                    </h2>

                                </div>

                                <Icon size={48} />

                            </div>

                        </div>

                    );

                })

            }

        </div>

    );

}

export default DashboardStats;