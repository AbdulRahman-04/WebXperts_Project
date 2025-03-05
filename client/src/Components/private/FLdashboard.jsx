import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FLdashboard = () => {
  const [freelancer, setFreelancer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getFreelancerData = async () => {
      try {
        if (!id) {
          console.log("❌ ID not found in localStorage");
          return;
        }

        const cleanedId = id.replace(/"/g, "");

        console.log("📢 Fetching freelancer data for ID:", cleanedId);

        let response = await axios.get(
          `http://localhost:6060/api/freelancers/getonefreelancer/${cleanedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        let flData = response.data;

        console.log("✅ Freelancer data:", flData);
        localStorage.setItem("freelancer", JSON.stringify(flData));
        setFreelancer(flData);
        setEditData({ ...flData });
      } catch (error) {
        console.error(
          "❌ Error fetching freelancer data:",
          error.response?.data || error.message
        );
      }
    };

    getFreelancerData();
  }, [id, token]);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("freelancer");
    navigate("/flsignin");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      console.log("Save button clicked");
      let updatedData = { _id: id, ...editData };

      const response = await axios.put(
        `http://localhost:6060/api/freelancers/editonefreelancer/${id.replace(
          /"/g,
          ""
        )}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Freelancer updated:", response.data);
      localStorage.setItem(
        "freelancer",
        JSON.stringify(response.data.updatedFreelancer)
      );
      setFreelancer(response.data.updatedFreelancer);
      setEditData(response.data.updatedFreelancer);
      setIsEditing(false);
    } catch (error) {
      console.error(
        "❌ Error updating freelancer data:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your profile? This action cannot be undone!"
      )
    ) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:6060/api/freelancers/deleteonefreelancer/${id.replace(
          /"/g,
          ""
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("🗑️ Profile Deleted:", response.data);

      // Clear localStorage & redirect to sign-in page
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("freelancer");
      navigate("/flsignin");
    } catch (error) {
      console.error(
        "❌ Error deleting profile:",
        error.response?.data || error.message
      );
    }
  };

  if (!freelancer) {
    return (
      <div className="text-white text-center mt-10">
        Loading Freelancer Data...
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        Welcome, {freelancer.fullname || "Freelancer"}!
      </h2>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-5 py-2 rounded-full bg-gray-600 text-white font-semibold shadow-md hover:bg-gray-700"
      >
        {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
      </button>

      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center w-96 transform transition-all duration-300 hover:scale-105">
        {isEditing ? (
          <>
            <input
              type="text"
              className="bg-gray-700 text-white p-3 rounded w-full mb-3"
              value={editData.fullname || ""}
              onChange={(e) =>
                setEditData({ ...editData, fullname: e.target.value })
              }
              placeholder="Full Name"
            />
            <input
              type="text"
              className="bg-gray-700 text-white p-3 rounded w-full mb-3"
              value={editData.expertiseIn || ""}
              onChange={(e) =>
                setEditData({ ...editData, expertiseIn: e.target.value })
              }
              placeholder="Expertise"
            />
            <input
              type="number"
              className="bg-gray-700 text-white p-3 rounded w-full mb-3"
              value={editData.experience || ""}
              onChange={(e) =>
                setEditData({ ...editData, experience: Number(e.target.value) })
              }
              placeholder="Experience (Years)"
            />
            <input
              type="text"
              className="bg-gray-700 text-white p-3 rounded w-full mb-3"
              value={editData.phone || ""}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
              placeholder="Phone Number"
            />
            <input
              type="text"
              className="bg-gray-700 text-white p-3 rounded w-full mb-3"
              value={editData.portfolioURL || ""}
              onChange={(e) =>
                setEditData({ ...editData, portfolioURL: e.target.value })
              }
              placeholder="Portfolio URL"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 px-5 py-2 rounded-lg text-white font-bold hover:bg-green-700 shadow-md mt-3"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2">
              {freelancer.fullname || "N/A"}
            </h3>
            <p className="text-gray-400 text-lg">
              {freelancer.expertiseIn || "N/A"}
            </p>
            <p className="text-blue-400 font-semibold text-lg">
              {freelancer.experience || "0"} months
            </p>
            <p className="text-yellow-300 text-lg">
              📞 {freelancer.phone || "N/A"}
            </p>
            {freelancer.portfolioURL && (
              <a
                href={freelancer.portfolioURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                🔗 Portfolio
              </a>
            )}
            <button
              onClick={handleEdit}
              className="mt-4 bg-yellow-500 px-5 py-2 rounded-lg text-white font-bold hover:bg-yellow-700 shadow-md w-full"
            >
              Edit Profile
            </button>

            <button
              onClick={handleDelete}
              className="mt-6 bg-red-700 px-5 py-2 rounded-lg text-white font-bold hover:bg-red-900 shadow-md"
            >
              Delete My Profile
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 px-5 py-2 rounded-lg text-white font-bold hover:bg-red-700 shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default FLdashboard;
