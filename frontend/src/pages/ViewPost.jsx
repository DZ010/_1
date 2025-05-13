import React, { useState } from 'react';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';

const ViewPost = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "HR Manager" },
    { id: 2, title: "Accountant" },
    { id: 3, title: "Cleaner" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleEdit = (post) => {
    setCurrentPost(post);
    setEditedTitle(post.title);
    setShowModal(true);
  };

  const handleSave = () => {
    const updatedPosts = posts.map((p) =>
      p.id === currentPost.id ? { ...p, title: editedTitle } : p
    );
    setPosts(updatedPosts);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

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
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{post.title}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleEdit(post)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="3" className="border px-2 py-2 text-gray-500">
                  No posts available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 items-center bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border px-3 py-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ViewPost;
