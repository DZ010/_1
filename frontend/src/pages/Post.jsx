import React, { useState } from 'react'
import Appbar from '../componets/Appbar'
import Footer from '../componets/footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Post = () => {
      const [post_title,setPost_title]= useState("");
      const navigate = useNavigate()
      const handleAdd =async(e)=>{
        e.preventDefault();
        try{
        const response = await axios.post("http://localhost:2121/api/post/createPost",{post_title})
        if(response.status==200){
          alert("created post successfully")
          navigate("/viewPost")
        }
        else{
          alert("failed to insert")
        }
      }
      catch(err){
    console.log(err)
  }
      }

  
  
  return (
    <>
    <Appbar />
    <div className="flex flex-col items-center text-center justify-center  ">
        <h1 className='text-3xl pt-30'>Add A New Post</h1>
        <form action="" onSubmit={handleAdd}>
            <div className="pt-25 gap-3 justify-between">
                <label htmlFor="post_tilte" className='text-2xl text-gray-600'>post_tilte:</label>
                <input type="text" value={post_title} onChange={(e)=>setPost_title(e.target.value)} className='border-2  border-gray-200 p-2 ' />
                <input type="submit" value="Add" className='bg-blue-500 rounded px-3 py-2 cursor-pointer' />

            </div>
            
            <div className="pt-5">
            <Link to="/viewPost" className='hover:text-blue-500 hover:underline'>ViewPost</Link>

            </div>
        </form>
    </div>
    <Footer />
    </>
  )
}

export default Post
