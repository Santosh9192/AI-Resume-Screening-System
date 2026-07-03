import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await api.post("/login", {

            email,

            password

        });

        const data = response.data;

        localStorage.setItem("token", data.access_token);

        localStorage.setItem("role", data.role);

        localStorage.setItem("email", data.email);

        if (data.role === "candidate") {

            navigate("/candidate-dashboard");

        } else {

            navigate("/recruiter-dashboard");

        }

    } catch (error) {

        toast.error("Invalid Email or Password");

    }

};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600">
          AI Resume Screening
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Welcome Back 👋
        </p>
        <form className="mt-8" onSubmit={handleLogin}>

          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
    type="password"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>

          <button
               type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 font-semibold ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;