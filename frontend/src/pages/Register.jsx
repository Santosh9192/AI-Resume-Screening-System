import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        full_name: "",

        email: "",

        password: "",

        role: "candidate"

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (

            !formData.full_name ||

            !formData.email ||

            !formData.password

        ) {

            toast("Please fill all fields.");

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(

                "/register",

                formData

            );

            toast.success(response.data.message);

            navigate("/");

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.detail ||

                "Registration failed."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center">

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-green-600">

                    Create Account

                </h1>

                <p className="text-center text-gray-500 mt-2">

                    Join AI Resume Screening

                </p>

                <form

                    className="mt-8"

                    onSubmit={handleRegister}

                >
                                      {/* Full Name */}

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">

                            Full Name

                        </label>

                        <input

                            type="text"

                            name="full_name"

                            value={formData.full_name}

                            onChange={handleChange}

                            placeholder="Enter your full name"

                            className="w-full border rounded-lg px-4 py-3"

                        />

                    </div>

                    {/* Email */}

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">

                            Email

                        </label>

                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Enter your email"

                            className="w-full border rounded-lg px-4 py-3"

                        />

                    </div>

                    {/* Password */}

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">

                            Password

                        </label>

                        <input

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            placeholder="Enter your password"

                            className="w-full border rounded-lg px-4 py-3"

                        />

                    </div>

                    {/* Role */}

                    <div className="mb-6">

                        <label className="block mb-2 font-medium">

                            Role

                        </label>

                        <select

                            name="role"

                            value={formData.role}

                            onChange={handleChange}

                            className="w-full border rounded-lg px-4 py-3"

                        >

                            <option value="candidate">

                                Candidate

                            </option>

                            <option value="recruiter">

                                Recruiter

                            </option>

                        </select>

                    </div>
                                        <button

                        type="submit"

                        disabled={loading}

                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-500 text-white py-3 rounded-lg font-semibold"

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Register"

                        }

                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    <Link

                        to="/"

                        className="text-blue-600 font-semibold ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>
            );

}

export default Register;