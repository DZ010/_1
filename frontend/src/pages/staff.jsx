import React, { useEffect, useState } from 'react';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';
import axios from 'axios';

const Staff = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    PostId: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    DateOfBirth: '',
    Email: '',
    Phone: '',
    Department: '',
    HireDate: '',
    Salary: '',
    Status: '',
    Address: ''
  });

  useEffect(() => {
    axios.get("http://localhost:2121/api/post/getAllPosts")
      .then(res => setPosts(res.data.data))
      .catch(err => console.log("Failed to fetch posts", err));
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:2121/api/staff/createStaff", form)
      .then(res => {
        alert("Staff added successfully!");
      })
      .catch(err => {
        alert("Error saving staff.");
        console.log(err);
      });
  };

  return (
    <div>
      <Appbar />
      <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-center">Add New Staff</h2>

         <div>
  <label className="block">Post:</label>
  <select name="PostId" value={form.PostId} onChange={handleChange} className="border p-2 w-full">
    <option value="">Select a post</option>
    {posts.map(post => (
      <option key={post.PostId} value={post.PostId}>
        {post.post_title}
      </option>
    ))}
  </select>
</div>

    

        <input name="FirstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="LastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="Gender" placeholder="Gender" onChange={handleChange} className="border p-2 w-full" />
        <input type='date' name="DateOfBirth" placeholder="YYYY-MM-DD" onChange={handleChange} className="border p-2 w-full" />
        <input name="Email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="Phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
        <input name="Department" placeholder="Department" onChange={handleChange} className="border p-2 w-full" />
        <input type='date' name="HireDate" placeholder="Hire Date YYYY-MM-DD" onChange={handleChange} className="border p-2 w-full" />
        <input name="Salary" placeholder="Salary" onChange={handleChange} className="border p-2 w-full" />
        <input name="Status" placeholder="Status" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="Address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Staff</button>
      </form>
      <Footer />
    </div>
  );
};

export default Staff;
