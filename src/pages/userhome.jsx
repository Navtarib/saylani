// import React, {useEffect} from 'react';
// import { useNavigate } from 'react-router-dom';
// import UserHeader from './userHeader';
// // import '../style/admincard.css'; // Reusing admin style for consistency
// import SeeBook from '../assets/see-book.avif';
// import MyRequests from '../assets/See-request.jpg';




// // Books Cards
// const cardData = [
//   {
//     id: 1,
//     title: "Create Event",
//     image: SeeBook,
//     buttonText: "Create",
//     action: "see-books",
//   },
//   {
//     id: 2,
//     title: "My Requests",
//     image: MyRequests,
//     buttonText: "View My Requests",
//     action: "my-requests",
//   },
// ];




// const UserHome = () => {
//   const navigate = useNavigate();




//  // ✅ Check role on mount
//   useEffect(() => {
//     const activeRole = localStorage.getItem("active_role");
//     const userToken = localStorage.getItem("user_token");

//     if (activeRole !== "user" || !userToken) {
//       // alert("Unauthorized access. Users only.");
//       navigate("/userlogin"); // 🔁 Redirect to user login
//     }
//   }, [navigate]);




//   const handleCardClick = (action) => {
//     switch (action) {
//       case "see-books":
//         navigate("/createEvent");
//         break;
      
      
//         case "my-requests":
//         navigate("/SeeEventRequests"); // 👈 Add this route and component
//         break;
//       default:
//         console.warn("Unknown action:", action);
//     }
//   };




//   return (
//     <div>
//       <UserHeader />

//       <div className="product-card-wrapper">
//         {cardData.map((card) => (
//           <div className="product-card" key={card.id}>
//             <div className="card-image">
//               <img src={card.image} alt={card.title} />
//             </div>
//             <div className="card-details">
//               <h3>{card.title}</h3>
//               <button onClick={() => handleCardClick(card.action)}>
//                 {card.buttonText}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };



// export default UserHome;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './userHeader';
import SeeBook from '../assets/see-book.avif';
import MyRequests from '../assets/See-request.jpg';

const cardData = [
  {
    id: 1,
    title: "Create Event",
    image: SeeBook,
    buttonText: "Create",
    action: "see-books",
  },
  {
    id: 2,
    title: "My Requests",
    image: MyRequests,
    buttonText: "View My Requests",
    action: "my-requests",
  },
];

const UserHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const activeRole = localStorage.getItem("active_role");
    const userToken = localStorage.getItem("user_token");

    if (activeRole !== "user" || !userToken) {
      navigate("/userlogin");
    }
  }, [navigate]);

  const handleCardClick = (action) => {
    switch (action) {
      case "see-books":
        navigate("/createEvent");
        break;
      case "my-requests":
        navigate("/SeeEventRequests");
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <UserHeader />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome to User Dashboard</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <button
                  onClick={() => handleCardClick(card.action)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;

