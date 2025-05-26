// import React, { useEffect, useState } from "react";
// import supabase from "../supabase"; // apna supabase client
// // import "../style/SeeEventRequest.css";

// const EventRequests = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingEvent, setEditingEvent] = useState(null);
//     const [viewingEvent, setViewingEvent] = useState(null);
//     const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
//     const [participantsList, setParticipantsList] = useState([]);
//     const [participantsModal, setParticipantsModal] = useState(false);
//     const role = localStorage.getItem("active_role");

//     // Fetch all events
//     const fetchEvents = async () => {
//         setLoading(true);
//         const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
//         if (!error) setEvents(data)
//         else alert("Error fetching events: " + error.message);
//         setLoading(false);

//     };

//     // Fetch participants for selected event
//     const fetchParticipants = async (eventId) => {
//         const { data, error } = await supabase.from("participants").select("*").eq("event_id", eventId);
//         if (!error) {
//             setParticipantsList(data);
//             setParticipantsModal(true);
//         } else alert("Error fetching participants: " + error.message);
//     };

//     // Add participant to currently viewed event
//     const handleAddParticipant = async () => {
//         if (!participant.name || !participant.email || !participant.age) return alert("All participant fields are required");

//         // Check for duplicate email in this event
//         const { data: existing, error: fetchError } = await supabase
//             .from("participants")
//             .select("*")
//             .eq("event_id", viewingEvent.id)
//             .eq("email", participant.email);

//         if (fetchError) return alert("Error checking existing participants: " + fetchError.message);
//         if (existing.length > 0) return alert("This email is already registered for the event");

//         const { error } = await supabase.from("participants").insert([
//             {
//                 name: participant.name,
//                 email: participant.email,
//                 age: participant.age,
//                 event_id: viewingEvent.id,
//             },
//         ]);

//         if (!error) {
//             alert("Participant added successfully");
//             setParticipant({ name: "", email: "", age: "" });
//             fetchParticipants(viewingEvent.id); // Refresh participants list
//         } else alert("Error adding participant: " + error.message);
//     };

//     const handleDeleteParticipant = async (participantId) => {
//         if (!window.confirm("Are you sure you want to delete this participant?")) return;
//         const { error } = await supabase.from("participants").delete().eq("id", participantId);
//         if (!error) {
//             alert("Participant deleted");
//             fetchParticipants(viewingEvent.id); // Refresh list
//         } else {
//             alert("Error deleting participant: " + error.message);
//         }
//     };

//     // Update event status (approve/reject)
//     const updateStatus = async (id, newStatus) => {
//         const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
//         if (!error) {
//             setEvents((prev) =>
//                 prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
//             );
//         } else alert("Error updating status: " + error.message);
//     };

//     // Delete event
//     const handleDeleteEvent = async (eventId) => {
//         if (!window.confirm("Are you sure you want to delete this event?")) return;
//         const { error } = await supabase.from("events").delete().eq("id", eventId);
//         if (!error) {
//             alert("Event deleted");
//             fetchEvents();
//         } else alert("Error deleting event: " + error.message);
//     };

//     const handleEditClick = (event) => setEditingEvent(event);
//     const handleEditComplete = () => {
//         setEditingEvent(null);
//         fetchEvents();
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="container">
//             <h2>Event Requests</h2>

//             {loading ? (
//                 <p>Loading events...</p>
//             ) : events.length === 0 ? (
//                 <p>No events found.</p>
//             ) : (
//                 <table className="event-table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Date</th>
//                             <th>Location</th>
//                             <th>Category</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {events.map((event) => (
//                             <tr key={event.id}>
//                                 <td>
//                                     {event.image_url ? (
//                                         <img src={event.image_url} alt={event.title} className="event-img" />
//                                     ) : (
//                                         <span>No Image</span>
//                                     )}
//                                 </td>
//                                 <td>{event.title}</td>
//                                 <td>{event.date}</td>
//                                 <td>{event.location}</td>
//                                 <td>{event.category}</td>
//                                 <td>
//                                     <span className={`status-badge ${event.status.toLowerCase()}`}>
//                                         {event.status}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <div className="action-buttons">
//                                         {role === "admin" ? (
//                                             <>
//                                                 {event.status === "Pending" && (
//                                                     <>
//                                                         <button className="btn-approve" onClick={() => updateStatus(event.id, "Approved")}>
//                                                             Approve
//                                                         </button>
//                                                         <button className="btn-reject" onClick={() => updateStatus(event.id, "Rejected")}>
//                                                             Reject
//                                                         </button>
//                                                     </>
//                                                 )}
//                                                 <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
//                                                 <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                 <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {event.status === "Pending" ? (
//                                                     <>
//                                                         <button className="btn-edit" onClick={() => handleEditClick(event)}>Edit</button>
//                                                         <button className="btn-delete" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                     </>
//                                                 ) : (
//                                                     <button className="btn-view" onClick={() => setViewingEvent(event)}>View</button>
//                                                 )}
//                                             </>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}

//             {/* Edit event form popup */}
//             {editingEvent && <EditEventForm event={editingEvent} onClose={handleEditComplete} />}

//             {/* View event modal popup */}
//             {viewingEvent && (
//                 <div className="modal-overlay" onClick={() => setViewingEvent(null)}>
//                     <div className="modal-content" onClick={e => e.stopPropagation()}>
//                         <h2>{viewingEvent.title}</h2>
//                         {viewingEvent.image_url && (
//                             <img src={viewingEvent.image_url} alt={viewingEvent.title} className="modal-img" />
//                         )}
//                         <p><strong>Date:</strong> {viewingEvent.date}</p>
//                         <p><strong>Location:</strong> {viewingEvent.location}</p>
//                         <p><strong>Category:</strong> {viewingEvent.category}</p>
//                         <p><strong>Status:</strong> {viewingEvent.status}</p>
//                         <p><strong>Description:</strong> {viewingEvent.description}</p>

//                         {viewingEvent.status === "Approved" && (
//                             <>
//                                 <div className="participant-form">
//                                     <h3>Add Participant</h3>
//                                     <input
//                                         type="text"
//                                         placeholder="Name"
//                                         value={participant.name}
//                                         onChange={(e) => setParticipant({ ...participant, name: e.target.value })}
//                                     />
//                                     <input
//                                         type="email"
//                                         placeholder="Email"
//                                         value={participant.email}
//                                         onChange={(e) => setParticipant({ ...participant, email: e.target.value })}
//                                     />
//                                     <input
//                                         type="number"
//                                         placeholder="Age"
//                                         value={participant.age}
//                                         onChange={(e) => setParticipant({ ...participant, age: e.target.value })}
//                                     />
//                                     <button className="btn-add-participant" onClick={handleAddParticipant}>Add Participant</button>
//                                 </div>

//                                 <button className="btn-view-participants" onClick={() => fetchParticipants(viewingEvent.id)}>
//                                     View Participants
//                                 </button>
//                             </>
//                         )}

//                         <button className="btn-close-modal" onClick={() => {
//                             setViewingEvent(null);
//                             setParticipantsModal(false);
//                             setParticipantsList([]);
//                         }}>
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Participants modal popup */}
//             {participantsModal && (
//                 <div className="modal-overlay" onClick={() => setParticipantsModal(false)}>
//                     <div className="modal-content participants-modal" onClick={e => e.stopPropagation()}>
//                         <h3>Participants</h3>
//                         {participantsList.length === 0 ? (
//                             <p>No participants added yet.</p>
//                         ) : (
//                             <table className="participants-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Email</th>
//                                         <th>Age</th>
//                                         <th>Actions</th> {/* new */}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {participantsList.map((p) => (
//                                         <tr key={p.id}>
//                                             <td>{p.name}</td>
//                                             <td>{p.email}</td>
//                                             <td>{p.age}</td>
//                                             <td>
//                                                 <button className="btn-delete" onClick={() => handleDeleteParticipant(p.id)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>

//                             </table>
//                         )}
//                         <button className="btn-close-modal" onClick={() => setParticipantsModal(false)}>
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EventRequests;
// import React, { useEffect, useState } from "react";
// import supabase from "../supabase";

// const EventRequests = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingEvent, setEditingEvent] = useState(null);
//     const [viewingEvent, setViewingEvent] = useState(null);
//     const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
//     const [participantsList, setParticipantsList] = useState([]);
//     const [participantsModal, setParticipantsModal] = useState(false);
//     const role = localStorage.getItem("active_role");

//     const fetchEvents = async () => {
//         setLoading(true);
//         const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
//         if (!error) setEvents(data);
//         else alert("Error fetching events: " + error.message);
//         setLoading(false);
//     };

//     const fetchParticipants = async (eventId) => {
//         const { data, error } = await supabase.from("participants").select("*").eq("event_id", eventId);
//         if (!error) {
//             setParticipantsList(data);
//             setParticipantsModal(true);
//         } else alert("Error fetching participants: " + error.message);
//     };

//     const handleAddParticipant = async () => {
//         if (!participant.name || !participant.email || !participant.age) return alert("All participant fields are required");

//         const { data: existing, error: fetchError } = await supabase
//             .from("participants")
//             .select("*")
//             .eq("event_id", viewingEvent.id)
//             .eq("email", participant.email);

//         if (fetchError) return alert("Error checking existing participants: " + fetchError.message);
//         if (existing.length > 0) return alert("This email is already registered for the event");

//         const { error } = await supabase.from("participants").insert([
//             {
//                 name: participant.name,
//                 email: participant.email,
//                 age: participant.age,
//                 event_id: viewingEvent.id,
//             },
//         ]);

//         if (!error) {
//             alert("Participant added successfully");
//             setParticipant({ name: "", email: "", age: "" });
//             fetchParticipants(viewingEvent.id);
//         } else alert("Error adding participant: " + error.message);
//     };

//     const handleDeleteParticipant = async (participantId) => {
//         if (!window.confirm("Are you sure you want to delete this participant?")) return;
//         const { error } = await supabase.from("participants").delete().eq("id", participantId);
//         if (!error) {
//             alert("Participant deleted");
//             fetchParticipants(viewingEvent.id);
//         } else {
//             alert("Error deleting participant: " + error.message);
//         }
//     };

//     const updateStatus = async (id, newStatus) => {
//         const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
//         if (!error) {
//             setEvents((prev) =>
//                 prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
//             );
//         } else alert("Error updating status: " + error.message);
//     };

//     const handleDeleteEvent = async (eventId) => {
//         if (!window.confirm("Are you sure you want to delete this event?")) return;
//         const { error } = await supabase.from("events").delete().eq("id", eventId);
//         if (!error) {
//             alert("Event deleted");
//             fetchEvents();
//         } else alert("Error deleting event: " + error.message);
//     };

//     const handleEditClick = (event) => setEditingEvent(event);
//     const handleEditComplete = () => {
//         setEditingEvent(null);
//         fetchEvents();
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
//             <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Event Requests</h2>

//             {loading ? (
//                 <p className="text-center text-gray-600">Loading events...</p>
//             ) : events.length === 0 ? (
//                 <p className="text-center text-gray-500">No events found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//                         <thead className="bg-gray-200 text-gray-700 text-sm">
//                             <tr>
//                                 <th className="p-3 text-left">Image</th>
//                                 <th className="p-3 text-left">Title</th>
//                                 <th className="p-3 text-left">Date</th>
//                                 <th className="p-3 text-left">Location</th>
//                                 <th className="p-3 text-left">Category</th>
//                                 <th className="p-3 text-left">Status</th>
//                                 <th className="p-3 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm text-gray-600">
//                             {events.map((event) => (
//                                 <tr key={event.id} className="border-b">
//                                     <td className="p-3">
//                                         {event.image_url ? (
//                                             <img src={event.image_url} alt={event.title} className="w-16 h-16 object-cover rounded-md" />
//                                         ) : (
//                                             <span className="text-gray-400">No Image</span>
//                                         )}
//                                     </td>
//                                     <td className="p-3">{event.title}</td>
//                                     <td className="p-3">{event.date}</td>
//                                     <td className="p-3">{event.location}</td>
//                                     <td className="p-3">{event.category}</td>
//                                     <td className="p-3">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'Approved' ? 'bg-green-100 text-green-700' : event.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{event.status}</span>
//                                     </td>
//                                     <td className="p-3 space-x-2">
//                                         {role === "admin" ? (
//                                             <>
//                                                 {event.status === "Pending" && (
//                                                     <>
//                                                         <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => updateStatus(event.id, "Approved")}>Approve</button>
//                                                         <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => updateStatus(event.id, "Rejected")}>Reject</button>
//                                                     </>
//                                                 )}
//                                                 <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
//                                                 <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                 <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {event.status === "Pending" ? (
//                                                     <>
//                                                         <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
//                                                         <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                     </>
//                                                 ) : (
//                                                     <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
//                                                 )}
//                                             </>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EventRequests;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import added
// import supabase from "../supabase";

// const EventRequests = () => {
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingEvent, setEditingEvent] = useState(null);
//     const [viewingEvent, setViewingEvent] = useState(null);
//     const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
//     const [participantsList, setParticipantsList] = useState([]);
//     const [participantsModal, setParticipantsModal] = useState(false);
//     const role = localStorage.getItem("active_role");
//     const navigate = useNavigate(); // ✅ useNavigate initialized

//     const fetchEvents = async () => {
//         setLoading(true);
//         const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
//         if (!error) setEvents(data);
//         else alert("Error fetching events: " + error.message);
//         setLoading(false);
//     };

//     const fetchParticipants = async (eventId) => {
//         const { data, error } = await supabase.from("participants").select("*").eq("event_id", eventId);
//         if (!error) {
//             setParticipantsList(data);
//             setParticipantsModal(true);
//         } else alert("Error fetching participants: " + error.message);
//     };

//     const handleAddParticipant = async () => {
//         if (!participant.name || !participant.email || !participant.age) return alert("All participant fields are required");

//         const { data: existing, error: fetchError } = await supabase
//             .from("participants")
//             .select("*")
//             .eq("event_id", viewingEvent.id)
//             .eq("email", participant.email);

//         if (fetchError) return alert("Error checking existing participants: " + fetchError.message);
//         if (existing.length > 0) return alert("This email is already registered for the event");

//         const { error } = await supabase.from("participants").insert([
//             {
//                 name: participant.name,
//                 email: participant.email,
//                 age: participant.age,
//                 event_id: viewingEvent.id,
//             },
//         ]);

//         if (!error) {
//             alert("Participant added successfully");
//             setParticipant({ name: "", email: "", age: "" });
//             fetchParticipants(viewingEvent.id);
//         } else alert("Error adding participant: " + error.message);
//     };

//     const handleDeleteParticipant = async (participantId) => {
//         if (!window.confirm("Are you sure you want to delete this participant?")) return;
//         const { error } = await supabase.from("participants").delete().eq("id", participantId);
//         if (!error) {
//             alert("Participant deleted");
//             fetchParticipants(viewingEvent.id);
//         } else {
//             alert("Error deleting participant: " + error.message);
//         }
//     };

//     const updateStatus = async (id, newStatus) => {
//         const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
//         if (!error) {
//             setEvents((prev) =>
//                 prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
//             );
//         } else alert("Error updating status: " + error.message);
//     };

//     const handleDeleteEvent = async (eventId) => {
//         if (!window.confirm("Are you sure you want to delete this event?")) return;
//         const { error } = await supabase.from("events").delete().eq("id", eventId);
//         if (!error) {
//             alert("Event deleted");
//             fetchEvents();
//         } else alert("Error deleting event: " + error.message);
//     };

//     const handleEditClick = (event) => setEditingEvent(event);
//     const handleEditComplete = () => {
//         setEditingEvent(null);
//         fetchEvents();
//     };

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
//             <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Event Requests</h2>

//             {/* ✅ Back to Dashboard Button */}
//             <div className="mb-6">
//                 <button
//                     onClick={() => navigate("/adminhome")}
//                     className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
//                 >
//                     ← Back to Admin Dashboard
//                 </button>
//             </div>

//             {loading ? (
//                 <p className="text-center text-gray-600">Loading events...</p>
//             ) : events.length === 0 ? (
//                 <p className="text-center text-gray-500">No events found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
//                         <thead className="bg-gray-200 text-gray-700 text-sm">
//                             <tr>
//                                 <th className="p-3 text-left">Image</th>
//                                 <th className="p-3 text-left">Title</th>
//                                 <th className="p-3 text-left">Date</th>
//                                 <th className="p-3 text-left">Location</th>
//                                 <th className="p-3 text-left">Category</th>
//                                 <th className="p-3 text-left">Status</th>
//                                 <th className="p-3 text-left">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm text-gray-600">
//                             {events.map((event) => (
//                                 <tr key={event.id} className="border-b">
//                                     <td className="p-3">
//                                         {event.image_url ? (
//                                             <img src={event.image_url} alt={event.title} className="w-16 h-16 object-cover rounded-md" />
//                                         ) : (
//                                             <span className="text-gray-400">No Image</span>
//                                         )}
//                                     </td>
//                                     <td className="p-3">{event.title}</td>
//                                     <td className="p-3">{event.date}</td>
//                                     <td className="p-3">{event.location}</td>
//                                     <td className="p-3">{event.category}</td>
//                                     <td className="p-3">
//                                         <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'Approved' ? 'bg-green-100 text-green-700' : event.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{event.status}</span>
//                                     </td>
//                                     <td className="p-3 space-x-2">
//                                         {role === "admin" ? (
//                                             <>
//                                                 {event.status === "Pending" && (
//                                                     <>
//                                                         <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => updateStatus(event.id, "Approved")}>Approve</button>
//                                                         <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => updateStatus(event.id, "Rejected")}>Reject</button>
//                                                     </>
//                                                 )}
//                                                 <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
//                                                 <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                 <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {event.status === "Pending" ? (
//                                                     <>
//                                                         <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
//                                                         <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
//                                                     </>
//                                                 ) : (
//                                                     <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
//                                                 )}
//                                             </>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EventRequests;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const EventRequests = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [viewingEvent, setViewingEvent] = useState(null);
    const [participant, setParticipant] = useState({ name: "", email: "", age: "" });
    const [participantsList, setParticipantsList] = useState([]);
    const [participantsModal, setParticipantsModal] = useState(false);
    const role = localStorage.getItem("active_role");
    const navigate = useNavigate();

    const fetchEvents = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("events").select("*").order("created_at", { ascending: false });
        if (!error) setEvents(data);
        else alert("Error fetching events: " + error.message);
        setLoading(false);
    };

    const fetchParticipants = async (eventId) => {
        const { data, error } = await supabase.from("participants").select("*").eq("event_id", eventId);
        if (!error) {
            setParticipantsList(data);
            setParticipantsModal(true);
        } else alert("Error fetching participants: " + error.message);
    };

    const handleAddParticipant = async () => {
        if (!participant.name || !participant.email || !participant.age) return alert("All participant fields are required");

        const { data: existing, error: fetchError } = await supabase
            .from("participants")
            .select("*")
            .eq("event_id", viewingEvent.id)
            .eq("email", participant.email);

        if (fetchError) return alert("Error checking existing participants: " + fetchError.message);
        if (existing.length > 0) return alert("This email is already registered for the event");

        const { error } = await supabase.from("participants").insert([
            {
                name: participant.name,
                email: participant.email,
                age: participant.age,
                event_id: viewingEvent.id,
            },
        ]);

        if (!error) {
            alert("Participant added successfully");
            setParticipant({ name: "", email: "", age: "" });
            fetchParticipants(viewingEvent.id);
        } else alert("Error adding participant: " + error.message);
    };

    const handleDeleteParticipant = async (participantId) => {
        if (!window.confirm("Are you sure you want to delete this participant?")) return;
        const { error } = await supabase.from("participants").delete().eq("id", participantId);
        if (!error) {
            alert("Participant deleted");
            fetchParticipants(viewingEvent.id);
        } else {
            alert("Error deleting participant: " + error.message);
        }
    };

    const updateStatus = async (id, newStatus) => {
        const { error } = await supabase.from("events").update({ status: newStatus }).eq("id", id);
        if (!error) {
            setEvents((prev) =>
                prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
            );
        } else alert("Error updating status: " + error.message);
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        const { error } = await supabase.from("events").delete().eq("id", eventId);
        if (!error) {
            alert("Event deleted");
            fetchEvents();
        } else alert("Error deleting event: " + error.message);
    };

    const handleEditClick = (event) => {
        setEditingEvent({ ...event });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("events")
            .update({
                title: editingEvent.title,
                date: editingEvent.date,
                location: editingEvent.location,
                category: editingEvent.category,
            })
            .eq("id", editingEvent.id);

        if (!error) {
            alert("Event updated successfully");
            handleEditComplete();
        } else {
            alert("Error updating event: " + error.message);
        }
    };

    const handleEditComplete = () => {
        setEditingEvent(null);
        fetchEvents();
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Event Requests</h2>

            <div className="mb-6">
                <button
                    onClick={() => {
                        if (role === "admin") navigate("/adminhome");
                        else navigate("/userhome");
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                    ← Back to Dashboard
                </button>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-center text-gray-500">No events found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                        <thead className="bg-gray-200 text-gray-700 text-sm">
                            <tr>
                                <th className="p-3 text-left">Image</th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Location</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600">
                            {events.map((event) => (
                                <tr key={event.id} className="border-b">
                                    <td className="p-3">
                                        {event.image_url ? (
                                            <img src={event.image_url} alt={event.title} className="w-16 h-16 object-cover rounded-md" />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                    </td>
                                    <td className="p-3">{event.title}</td>
                                    <td className="p-3">{event.date}</td>
                                    <td className="p-3">{event.location}</td>
                                    <td className="p-3">{event.category}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'Approved' ? 'bg-green-100 text-green-700' : event.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{event.status}</span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        {role === "admin" ? (
                                            <>
                                                {event.status === "Pending" && (
                                                    <>
                                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => updateStatus(event.id, "Approved")}>Approve</button>
                                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => updateStatus(event.id, "Rejected")}>Reject</button>
                                                    </>
                                                )}
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
                                                <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                                <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
                                            </>
                                        ) : (
                                            <>
                                                {event.status === "Pending" ? (
                                                    <>
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEditClick(event)}>Edit</button>
                                                        <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                                    </>
                                                ) : (
                                                    <button className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600" onClick={() => setViewingEvent(event)}>View</button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {editingEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                        <h3 className="text-xl font-bold mb-4">Edit Event</h3>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={editingEvent.title}
                                onChange={(e) => setEditingEvent(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Title"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="date"
                                value={editingEvent.date}
                                onChange={(e) => setEditingEvent(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={editingEvent.location}
                                onChange={(e) => setEditingEvent(prev => ({ ...prev, location: e.target.value }))}
                                placeholder="Location"
                                className="w-full border p-2 rounded"
                            />
                            <input
                                type="text"
                                value={editingEvent.category}
                                onChange={(e) => setEditingEvent(prev => ({ ...prev, category: e.target.value }))}
                                placeholder="Category"
                                className="w-full border p-2 rounded"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleEditComplete}
                                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventRequests;
