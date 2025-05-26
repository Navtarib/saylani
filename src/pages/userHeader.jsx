// import React from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/logo.png"; // Adjust path if needed
// import "../style/userheader.css"; // Link to CSS
// // import supabase from '../supabase';




// const UserHeader = () => {
//   const navigate = useNavigate();




// // logout function
//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//    localStorage.removeItem("user_token");
// localStorage.removeItem("user_role");

//     navigate('/dashboard');
//   };




//   return (
//     <header className="user-header">
//       <div className="logo">
//         <img src={logo} alt="Logo" />
//       </div>

//       <div className="dashboard-title">User Dashboard</div>

//       <button className="logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </header>
//   );
// };




// export default UserHeader;
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust path as needed
import supabase from "../supabase"; // Uncomment when Supabase is set up

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_role");
    navigate("/dashboard");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md bg-white fixed w-full top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <span className="text-lg font-semibold text-gray-800 hidden sm:inline">User Dashboard</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
      >
        Logout
      </button>
    </header>
  );
};

export default UserHeader;

