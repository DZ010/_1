import React, { useEffect, useState } from 'react';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate= useNavigate()
  useEffect(() => {
    axios.get("http://localhost:2121/api/post/getAllPosts")
      .then(res => setPosts(res.data.data))
      .catch(err => console.log("Failed to fetch posts", err));
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
try{
    const response= await axios.post("http://localhost:2121/api/staff/createStaff",form)
    if(response.status==200){
      alert("added successfully")
     navigate("/viewStaff")


    }
    else{
      alert("failed to insert")
    }
} 
catch(err){
    alert("error happened")
    console.error(err)
}   
   
  };


  return (
    <div>
      <Appbar />
      <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
 <div className="flex justify-end">
    <Link to="/viewStaff" className="text-blue-600 hover:underline">View Staff</Link>
  </div>       
   <h2 className="text-2xl font-bold text-center">Add New Staff</h2>
         <div>
  <select name="PostId" value={form.PostId} onChange={handleChange} className="border p-2 w-full">
    <option value="">Select a post</option>
    {posts.map(post => (
      <option key={post.PostId} value={post.PostId}>
        {post.post_title}
      </option>
    ))}
  </select>
</div>

    

        <input type="text" name="FirstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="LastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Gender" placeholder="Gender" onChange={handleChange} className="border p-2 w-full" />
        <input type='date' name="DateOfBirth" placeholder="YYYY-MM-DD" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Department" placeholder="Department" onChange={handleChange} className="border p-2 w-full" />
        <input type='date' name="HireDate" placeholder="Hire Date YYYY-MM-DD" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Salary" placeholder="Salary" onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="Status" placeholder="Status" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="Address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Staff</button>
      </form>
      <Footer />
    </div>
  );
};

export default Staff;
