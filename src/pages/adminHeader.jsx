// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"; // Adjust path if needed
// // import "../style/adminheader.css"; // Link to CSS
// import supabase from '../supabase';

// const UserHeader = () => {
//   const navigate = useNavigate();

// // logout function
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     localStorage.removeItem("admin_token");
// localStorage.removeItem("admin_role");

//     navigate('/dashboard');
//   };

//   return (
//     <header className="admin-header">
//       <div className="logo">
//         <img src={logo} alt="Logo" />
//       </div>

//       <div className="dashboard-title">Admin Dashboard</div>

//       <button className="logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </header>
//   );
// };

// export default UserHeader;






import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure correct path
import supabase from "../supabase";

const UserHeader = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role");
    navigate("/dashboard");
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full">
      {/* Logo and Title Section */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Admin Dashboard</h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg text-sm md:text-base transition duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default UserHeader;
