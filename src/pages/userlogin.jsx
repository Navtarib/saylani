import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../supabase";
import useAuthRedirect from "../hooks/useAuthRedirect";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useAuthRedirect();

  async function handleform(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data?.session?.access_token) {
      localStorage.setItem("user_token", data.session.access_token);
      localStorage.setItem("user_role", "user");
      localStorage.setItem("active_role", "user");
      navigate("/userhome");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Login</h1>

        <form onSubmit={handleform} className="space-y-5">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Not registered yet?{" "}
          <Link to="/userregister" className="text-blue-600 underline hover:text-blue-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
