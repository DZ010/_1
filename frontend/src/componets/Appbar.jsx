import React from 'react'
import { Link } from 'react-router-dom'
const Appbar = () => {
  return (
    <>
    <div className="flex bg-blue-500 h-16 justify-betwen items-center shadow-md px-6">
        <h1 className='text-white text-lg'>HR</h1>
        <nav className='space-x-4 ml-auto text-white'>
            <Link to="/home"  className='hover:underline'>Home</Link>
            <Link to="/post" className='hover:underline'>Post</Link>
            <Link to="/staff" className='hover:underline'>Staff</Link>
            <Link to="/Users" className='hover:underline'>users</Link>
            <Link to="/" className='hover:underline'>Logout</Link>
        </nav>

    </div>
    
    </>
  )
}

export default Appbar
