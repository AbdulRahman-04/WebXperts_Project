import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for routing

const Dashboard = () => {
  const [data, setData] = useState([]); // State to store freelancers data
  const [search, setSearch] = useState(""); // State to handle search input
  const [loading, setLoading] = useState(true); // Loading state for API fetch
  const [filteredFreelancers, setFilteredFreelancers] = useState([]); // State to store filtered freelancers
  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to fetch all freelancers
  async function getAllFreelancers() {
    try {
      let apiUrl = "http://localhost:6060/api/freelancers/getallfreelancers";
      let res = await axios.get(apiUrl);
      setData(res.data); // Set the fetched freelancers data
      setFilteredFreelancers(res.data); // Initialize filtered freelancers with all data
      setLoading(false); // Data is loaded, stop the loading state
    } catch (error) {
      console.log(error.response?.data || error);
      setLoading(false); // Stop loading even if there's an error
    }
  }

  // Filter freelancers whenever the search term changes
  useEffect(() => {
    const filtered = data.filter((freelancer) =>
      freelancer.fullname.toLowerCase().includes(search.toLowerCase())
    );
    console.log(filtered);
    setFilteredFreelancers(filtered);
  }, [search, data]); // Dependency array includes data and search so it filters when either changes

  // Fetch freelancers on component mount
  useEffect(() => {
    getAllFreelancers();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token from localStorage
    navigate("/signin"); // Navigate to the signin page
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-blue-700 min-h-screen text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-gray-300/20 rounded-3xl p-10 w-full max-w-5xl shadow-2xl flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Find a Freelancer
        </h1>

        <div className="flex items-center bg-gray-200/30 p-4 rounded-full mb-6 w-full max-w-2xl border border-gray-300/20">
          <FaSearch className="text-gray-300 mx-4" />
          <input
            type="text"
            placeholder="Search by name or skill..."
            className="bg-transparent w-full outline-none text-white px-4 placeholder-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Update search term
          />
        </div>

        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map((freelancer, index) => (
                <div
                  key={index}
                  className="freelancer-card bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300/10"
                >
                  <h1 className="text-3xl font-semibold mb-2 text-white">
                    {freelancer.fullName}
                  </h1>

                  <h1 className="text-gray-200 mb-1 text-3xl font-semibold">
                    {freelancer.fullname}
                  </h1>
                  {/* Email Link */}
                  <a
                    href={`mailto:${freelancer.email}`}
                    className="text-blue-400 underline"
                  >
                    {freelancer.email}
                  </a>

                  <p className="text-gray-300 mb-1">{freelancer.experience}</p>
                  <p className="text-blue-300 font-medium mb-1">
                    {freelancer.expertiseIn}
                  </p>
                  <p className="text-green-300 font-semibold mb-2">
                    {freelancer.hourlyRate}
                  </p>
                  <a
                    href={freelancer.portfolioURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View Portfolio
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No freelancers found.</p>
            )}
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout} // Attach logout functionality
        type="button"
        className="border-2 p-2 mt-3 rounded-2xl bg-blue-500 text-black hover:bg-blue-600"
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
