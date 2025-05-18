import React, { useEffect, useState } from 'react';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';
import axios from "axios";

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get("http://localhost:2121/api/post/getAllPosts")
      .then(res => {
        setPosts(res.data.data);
      })
      .catch(err => {
        alert("Failed to fetch posts");
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2121/api/post/deletePost/${id}`)
      .then(() => {
        alert("Post deleted successfully");
        setPosts(posts.filter(post => post.PostId !== id));
      })
      .catch(err => {
        alert("Failed to delete post");
        console.error(err);
      });
  };

  const startEdit = (post) => {
    setEditId(post.PostId);
    setEditTitle(post.post_title);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:2121/api/post/updatePost/${editId}`, {
      post_title: editTitle
    })
      .then(() => {
        alert("Post updated successfully");
        setEditId(null);
        setEditTitle("");
        fetchPosts();
      })
      .catch(err => {
        alert("Failed to update post");
        console.error(err);
      });
  };

  return (
    <>
      <Appbar />
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">View All The Posts</h1>

        <table className="border border-gray-400 w-full max-w-2xl mx-auto mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Post Title</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.PostId}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{post.post_title}</td>
                <td className="border px-2 py-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => startEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(post.PostId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit form below the table */}
        {editId && (
          <form onSubmit={handleUpdate} className="max-w-xl mx-auto border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Edit Post</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="border w-full p-2 mb-3"
              placeholder="Edit post title"
              required
            />
            <div className="flex justify-end gap-2">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Update
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => {
                  setEditId(null);
                  setEditTitle("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ViewPost;
