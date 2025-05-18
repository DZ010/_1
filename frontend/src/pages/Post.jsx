import React, { useState, useEffect } from 'react'
import Appbar from '../componets/Appbar'
import Footer from '../componets/footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Post = () => {
  const [post_title, setPost_title] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Session check on mount
  useEffect(() => {
    axios
      .get("http://localhost:2121/api/auth/check", { withCredentials: true })
      .then((res) => {
        if (!res.data.loggedIn) {
          navigate("/");
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2121/api/post/createPost", { post_title }, {
        withCredentials: true
      });
      if (response.status === 200) {
        alert("Created post successfully");
        navigate("/viewPost");
      } else {
        alert("Failed to insert");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p>Checking session...</p>;

  return (
    <>
      <Appbar />
      <div className="flex flex-col items-center text-center justify-center">
        <h1 className='text-3xl pt-30'>Add A New Post</h1>
        <form onSubmit={handleAdd}>
          <div className="pt-25 gap-3 justify-between">
            <label htmlFor="post_title" className='text-2xl text-gray-600'>Post Title:</label>
            <input
              type="text"
              value={post_title}
              onChange={(e) => setPost_title(e.target.value)}
              className='border-2 border-gray-200 p-2 mx-2'
            />
            <input
              type="submit"
              value="Add"
              className='bg-blue-500 rounded px-3 py-2 cursor-pointer text-white'
            />
          </div>
          <div className="pt-5">
            <Link to="/viewPost" className='hover:text-blue-500 hover:underline'>View Posts</Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Post;
