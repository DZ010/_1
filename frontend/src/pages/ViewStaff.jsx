import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Appbar from '../componets/Appbar';
import Footer from '../componets/footer';

const ViewStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null); 
  const [posts,setPosts]= useState([])

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get('http://localhost:2121/api/staff/getAllStaff');
        console.log(res.data.data);
        setStaffList(res.data.data);
      } catch (err) {
        console.log("Failed to fetch staff", err);
      }
    };

    fetchStaff();
  }, []);

  useEffect(()=>{
    const fetchPosts= async()=>{
      try{
        const response= await axios.get("http://localhost:2121/api/post/getAllPosts")
        console.log(response.data.data)
        setPosts(response.data.data)

      }
      catch(err){
        console.error(err);
        alert("failed to fetch")
      }
    }
    fetchPosts()
  },[])
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:2121/api/staff/deleteStaff/${id}`);
      if (response.status === 200) {
        alert("Deleted successfully");
        setStaffList(staffList.filter(staff => staff.employeeId !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  const handleEditChange = (e) => {
    setEditingStaff({ ...editingStaff, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:2121/api/staff/updateStaff/${editingStaff.employeeId}`, editingStaff);
      if (response.status === 200) {
        alert("Updated successfully");
        // Refresh list or update local state
        const updatedList = staffList.map(staff =>
          staff.employeeId === editingStaff.employeeId ? editingStaff : staff
        );
        setStaffList(updatedList);
        setEditingStaff(null);
      } else {
        alert("Update failed");
      }
    } catch (err) {
      alert("Server error during update");
      console.error(err);
    }
  };

  return (
    <div>
      <Appbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">All Staff Members</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Post</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">HireDate</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff, index) => (
                <tr key={staff.employeeId} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{staff.post_title}</td>
                  <td className="border p-3">{staff.FirstName} {staff.LastName}</td>
                  <td className="border p-2">{staff.Gender}</td>
                  <td className="border p-2">{staff.Email}</td>
                  <td className="border p-2">{staff.Phone}</td>
                  <td className="border p-2">{staff.Department}</td>
                  <td className="border p-2">{staff.HireDate}</td>
                  <td className="border p-2">{staff.Salary}</td>
                  <td className="border p-2">{staff.Status}</td>
                  <td className="border p-2">{staff.Address}</td>
                  <td className='border px-2 py-1'>
                    <button
                      onClick={() => setEditingStaff(staff)}
                      className='bg-blue-500 text-white cursor-pointer rounded px-2 py-1 mr-2'
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(staff.employeeId)}
                      className='bg-red-500 text-white cursor-pointer rounded px-2 py-1'
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editingStaff && (
          <div className="mt-6 p-4 border bg-gray-50 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Staff</h3>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-2 gap-4">
 <select
  name="PostId"
  value={editingStaff.PostId}
  onChange={handleEditChange}
  className="border p-2"
>
  <option value="">Select post_title</option>
  {posts.map(post => (
    <option key={post.PostId} value={post.PostId}>
      {post.post_title}
    </option>
  ))}
</select>


              <input name="FirstName" value={editingStaff.FirstName} onChange={handleEditChange} placeholder="First Name" className="border p-2" />
              <input name="LastName" value={editingStaff.LastName} onChange={handleEditChange} placeholder="Last Name" className="border p-2" />
              <input name="Gender" value={editingStaff.Gender} onChange={handleEditChange} placeholder="Gender" className="border p-2" />
              <input name="Email" value={editingStaff.Email} onChange={handleEditChange} placeholder="Email" className="border p-2" />
              <input name="Phone" value={editingStaff.Phone} onChange={handleEditChange} placeholder="Phone" className="border p-2" />
              <input name="Department" value={editingStaff.Department} onChange={handleEditChange} placeholder="Department" className="border p-2" />
              <input name="HireDate" value={editingStaff.HireDate} onChange={handleEditChange} placeholder="Hire Date" className="border p-2" />
              <input name="Salary" value={editingStaff.Salary} onChange={handleEditChange} placeholder="Salary" className="border p-2" />
              <input name="Status" value={editingStaff.Status} onChange={handleEditChange} placeholder="Status" className="border p-2" />
              <input name="Address" value={editingStaff.Address} onChange={handleEditChange} placeholder="Address" className="border p-2" />

              <div className="col-span-2 text-center mt-4">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save Changes</button>
                <button type="button" onClick={() => setEditingStaff(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewStaff;
