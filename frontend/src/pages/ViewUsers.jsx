import React, { useEffect, useState } from "react";
import axios from "axios";
import Appbar from "../componets/Appbar";
import Footer from "../componets/footer";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:2121/api/auth/getAllUsers");
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch users");
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <>
      <Appbar />
      <div className="max-w-5xl mx-auto p-6 mt-10 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Username</th>
              <th className="border p-2">Employee Names</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.FirstName} {user.LastName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default ViewUsers;
