import React, { useEffect, useState } from "react";
import Footer from "../componets/footer";
import Appbar from "../componets/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  if (loading) return <p>Checking session...</p>;

  return (
    <>
      <Appbar />
      <div className="flex items-center text-center justify-center pt-80 ">
        <h1 className="text-4xl font-serif">Welcome to HR Dashboard</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
