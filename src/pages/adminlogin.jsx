// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import "../style/login.css"; // Same style as user login




// function AdminLogin() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");


//   // Predefined static credentials
//   const adminEmail = "admin@gmail.com";
//   const adminPassword = "admin123";



//   const handleform = (e) => {
//     e.preventDefault();




//     // check for valid Role & token
// if (email === adminEmail && password === adminPassword) {
//       const adminToken = crypto.randomUUID(); // ✅ Generate random token
//       localStorage.setItem("admin_token", adminToken);
//       localStorage.setItem("admin_role", "admin");
//       localStorage.setItem("active_role", "admin"); // or "admin"
//       navigate("/adminhome");
// } else {
//       alert("Invalid admin credentials");
// }
// };



// // Return UI
//   return (
//     <div className="auth-wrapper">
//       <div className="auth-form-container">
//         <h1 className="auth-heading">Admin Login</h1>

//         <form onSubmit={handleform} className="auth-form">
//           <input
//             type="email"
//             value={email}
//             placeholder="Admin Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="auth-input"
//           />

//           <input
//             type="password"
//             value={password}
//             placeholder="Admin Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="auth-input"
//           />

//           <button type="submit" className="auth-button">
//             Sign In as Admin
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Predefined static credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  const handleform = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      const adminToken = crypto.randomUUID();
      localStorage.setItem("admin_token", adminToken);
      localStorage.setItem("admin_role", "admin");
      localStorage.setItem("active_role", "admin");
      navigate("/adminhome");
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">Admin Login</h1>

        <form onSubmit={handleform} className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Admin Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            placeholder="Admin Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-300"
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

