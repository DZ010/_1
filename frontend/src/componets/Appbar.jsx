import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Appbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:2121/api/auth/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex bg-blue-500 h-16 justify-between items-center shadow-md px-6">
      <h1 className='text-white text-lg'>HR</h1>
      <nav className='space-x-4 ml-auto text-white'>
        <Link to="/home" className='hover:underline'>Home</Link>
        <Link to="/post" className='hover:underline'>Post</Link>
        <Link to="/staff" className='hover:underline'>Staff</Link>
        <Link to="/Users" className='hover:underline'>Users</Link>
        <button onClick={handleLogout} className='hover:underline'>Logout</button>
      </nav>
    </div>
  );
};

export default Appbar;
