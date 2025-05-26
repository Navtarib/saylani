// import { useState } from 'react';
// import supabase from '../supabase';
// // import '../style/createEvent.css';

// export default function CreateEvent() {
//     const [form, setForm] = useState({ title: '', description: '', location: '', category: '', date_time: '' });
//     const [image, setImage] = useState(null);
//     const [errors, setErrors] = useState({});

//     const validateForm = () => {
//         const newErrors = {};
//         if (!form.title.trim()) newErrors.title = "Title is required.";
//         if (!form.description.trim()) newErrors.description = "Description is required.";
//         if (!form.location.trim()) newErrors.location = "Location is required.";
//         if (!form.category.trim()) newErrors.category = "Please select a category.";
//         if (!form.date_time.trim()) newErrors.date_time = "Date & time is required.";
//         if (!image) newErrors.image = "Image is required.";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async () => {
//         if (!validateForm()) return;

//         const user = (await supabase.auth.getUser()).data.user;

//         let imageUrl = '';
//         if (image) {
//             const { data, error } = await supabase.storage.from('event-images').upload(`${Date.now()}-${image.name}`, image);
//             if (!error) {
//                 const { data: publicURL } = supabase.storage.from('event-images').getPublicUrl(data.path);
//                 imageUrl = publicURL.publicUrl;
//             } else {
//                 alert("Image upload failed.");
//                 return;
//             }
//         }

//         const { error } = await supabase.from('events').insert([
//             { ...form, image_url: imageUrl, created_by: user.id, status: 'Pending' }
//         ]);

//         if (error) {
//             alert("Error submitting event.");
//         } else {
//             alert("Event created!");
//             setForm({ title: '', description: '', location: '', category: '', date_time: '' });
//             setImage(null);
//             setErrors({});
//         }
//     };

//     return (
//         <div className="form-container">
//             <h2 className="form-title">Create Event</h2>

//             <label className="form-label">Title</label>
//             <input className="form-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//             {errors.title && <p className="error">{errors.title}</p>}

//             <label className="form-label">Description</label>
//             <textarea className="form-input" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//             {errors.description && <p className="error">{errors.description}</p>}

//             <label className="form-label">Date & Time</label>
//             <input className="form-input" type="datetime-local" value={form.date_time} onChange={(e) => setForm({ ...form, date_time: e.target.value })} />
//             {errors.date_time && <p className="error">{errors.date_time}</p>}

//             <label className="form-label">Location</label>
//             <input className="form-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
//             {errors.location && <p className="error">{errors.location}</p>}

//             <label className="form-label">Category</label>
//             <select className="form-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
//                 <option value="">Select category</option>
//                 <option>Tech</option>
//                 <option>Education</option>
//                 <option>Entertainment</option>
//             </select>
//             {errors.category && <p className="error">{errors.category}</p>}

//             <label className="form-label">Upload Image</label>
//             <input className="form-input" type="file" onChange={(e) => setImage(e.target.files[0])} />
//             {errors.image && <p className="error">{errors.image}</p>}

//             <button className="form-button" onClick={handleSubmit}>Request Event</button>
//         </div>
//     );
// }

import { useState } from 'react';
import supabase from '../supabase';

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    date_time: ''
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.category.trim()) newErrors.category = "Please select a category.";
    if (!form.date_time.trim()) newErrors.date_time = "Date & time is required.";
    if (!image) newErrors.image = "Image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const user = (await supabase.auth.getUser()).data.user;

    let imageUrl = '';
    if (image) {
      const { data, error } = await supabase.storage.from('event-images').upload(`${Date.now()}-${image.name}`, image);
      if (!error) {
        const { data: publicURL } = supabase.storage.from('event-images').getPublicUrl(data.path);
        imageUrl = publicURL.publicUrl;
      } else {
        alert("Image upload failed.");
        return;
      }
    }

    const { error } = await supabase.from('events').insert([
      { ...form, image_url: imageUrl, created_by: user.id, status: 'Pending' }
    ]);

    if (error) {
      alert("Error submitting event.");
    } else {
      alert("Event created!");
      setForm({ title: '', description: '', location: '', category: '', date_time: '' });
      setImage(null);
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Create Event</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Date & Time</label>
            <input
              type="datetime-local"
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.date_time}
              onChange={(e) => setForm({ ...form, date_time: e.target.value })}
            />
            {errors.date_time && <p className="text-red-500 text-sm mt-1">{errors.date_time}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select category</option>
              <option value="Tech">Tech</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Upload Image</label>
            <input
              type="file"
              className="w-full mt-1 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <button
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-300"
            onClick={handleSubmit}
          >
            Request Event
          </button>
        </div>
      </div>
    </div>
  );
}

