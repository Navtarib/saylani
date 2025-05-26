
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Admin Navigation
  const handleAdminClick = () => {
    const adminToken = localStorage.getItem("admin_token");
    const adminRole = localStorage.getItem("admin_role");

    if (adminToken && adminRole === "admin") {
      navigate("/adminhome");
    } else {
      navigate("/adminlogin");
    }
  };

  // User Navigation
  const handleUserClick = () => {
    const userToken = localStorage.getItem("user_token");
    const userRole = localStorage.getItem("user_role");

    if (userToken && userRole === "user") {
      navigate("/userhome");
    } else {
      navigate("/userlogin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-6 px-4">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Event Management System
        </h1>
      </header>

      {/* Button Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-24 px-4">
        <button
          onClick={handleUserClick}
          className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out w-full md:w-auto"
        >
          Login as User
        </button>

        <button
          onClick={handleAdminClick}
          className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out w-full md:w-auto"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
