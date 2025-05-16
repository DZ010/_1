import React, { useEffect, useState } from 'react';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';
import axios from "axios"

const ViewPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:2121/api/post/getAllPosts")
    .then(res=>{
      console.log(res.data)
      setPosts(res.data.data)
    })
    .catch(err=>{
     alert("failed to festch post",err)
    })
  },[])
 
  const handeDelete=(id)=>{
    axios.delete(`http://localhost:2121/api/post/deletePost/${id}`)
    .then(res=>{
      alert("post deleted successfully")
      setPosts(posts.filter(post=> post.PostId!==id))
    })
    .catch(err=>{
      console.error(err)
      alert("failed to delete")
    })
  }
  return (
    <>
      <Appbar />
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">View All The Posts</h1>
        <table className="border border-gray-400 w-full max-w-2xl mx-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Post Title</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post , index) => (
              <tr key={post.PostId}>
                <td className="border px-2 py-1">{index+1}</td>
                <td className="border px-2 py-1">{post.post_title}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={()=>handeDelete(post.PostId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      <Footer />
    </>
  );
};

export default ViewPost;
