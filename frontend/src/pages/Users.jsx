import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Appbar from "../componets/Appbar";
import Footer from "../componets/footer";
import axios from "axios";

const Users = () => {
  const [staffList, setStaffList] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2121/api/auth/register",
        form
      );
      if (response.status === 200) {
        alert("Inserted successfully");
        setForm({ employeeId: "", username: "", password: "" });
      } else {
        alert("Failed to insert");
      }
    } catch (err) {
      alert("Failed to insert");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get("http://localhost:2121/api/staff/getAllStaff");
        setStaffList(res.data.data);
      } catch (err) {
        console.log(err);
        alert("Failed to fetch staff");
      }
    };
    fetchStaff();
  }, []);

  return (
    <>
      <Appbar />
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Register a New User
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            value={form.employeeId}
            name="employeeId"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >
            <option value="">Select Staff member</option>
            {staffList.map((staff) => (
              <option key={staff.employeeId} value={staff.employeeId}>
                {staff.FirstName} {staff.LastName}
              </option>
            ))}
          </select>

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="border p-3 rounded"
            required
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter password"
            className="border p-3 rounded"
            required
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Save
            </button>
            <Link
              to="/viewUsers"
              className="text-blue-600 hover:underline mt-2"
            >
              Show All Users
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Users;
