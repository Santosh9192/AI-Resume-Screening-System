import React from "react";

function Navbar({

    title,

    subtitle,

    email,

    color = "blue",

    onLogout

}) {

    const bgColor = {

        blue: "bg-blue-700",

        green: "bg-green-700",

        purple: "bg-purple-700"

    };

    return (

        <nav
            className={`${bgColor[color]} text-white shadow-lg`}
        >

            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                <div>

                    <h1 className="text-3xl font-bold">

                        {title}

                    </h1>

                    <p className="text-sm mt-1 opacity-90">

                        {subtitle}

                    </p>

                </div>

                <div className="flex items-center gap-6">

                    <div className="text-right">

                        <p className="text-sm">

                            Logged in as

                        </p>

                        <p className="font-semibold">

                            {email}

                        </p>

                    </div>

                    <button

                        onClick={onLogout}

                        className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-lg"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;