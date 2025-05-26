// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import supabase from '../supabase';
// // import '../style/register.css'; // 🟡 Import CSS
// import useAuthRedirect from "../hooks/useAuthRedirect";




// const Register = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useAuthRedirect();

//   async function handleform(e) {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.message);
//     } else {
//       alert('Registration successful!');
//       navigate('/userlogin');
//     }
//   }



//   // register form html return function
//   return (

//     <div className="register-wrapper">
//       <form className="register-form" onSubmit={(e)=>{ handleform(e)}}>
//         <h2>Create Account</h2>

//         {/* email input */}
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />


//       {/* password input */}
//         <input
//           type="password"
//           placeholder="Enter a strong password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />


//         {/* register button */}
//         <button type="submit">Register</button>
//         <p className="login-link" onClick={() => navigate('/userlogin')}>
//           Already have an account? <span>Login</span>
//         </p>


//       </form>
//     </div>

//     // return function ends here
//   );
// };

// export default Register;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import useAuthRedirect from "../hooks/useAuthRedirect";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useAuthRedirect();

  async function handleform(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Registration successful!');
      navigate('/userlogin');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleform}>
          {/* Email input */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Register button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/userlogin')}
            className="text-blue-600 cursor-pointer underline hover:text-blue-800"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
