import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Dashboard = () => {
  const [data, setData] = useState([]); // Store freelancers data
  const [search, setSearch] = useState(""); // Handle search input
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredFreelancers, setFilteredFreelancers] = useState([]); // Store filtered freelancers
  const navigate = useNavigate(); // Initialize navigation hook

  // Function to fetch all freelancers
  async function getAllFreelancers() {
    let token = localStorage.getItem("authToken"); // ✅ Ensure token exists
    console.log("Token from LocalStorage:", token); // ✅ Debugging
  
    if (!token) {
      console.error("No auth token found! Redirecting to Signin...");
      navigate("/signin"); // ✅ Redirect to login
      return;
    }
  
    try {
      let res = await axios.get("http://localhost:6060/api/freelancers/getallfreelancers", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Freelancers Data Received:", res.data);
      
      if (Array.isArray(res.data)) {
        setData(res.data);
        setFilteredFreelancers(res.data); // ✅ Initialize filtered list
      } else {
        console.error("API response is not an array!", res.data);
        setData([]);
        setFilteredFreelancers([]);
      }
    } catch (error) {
      console.error("Error fetching freelancers:", error);
    } finally {
      setLoading(false); // ✅ Ensure loading is set to false
    }
  }

  // Fetch freelancers on component mount
  useEffect(() => {
    getAllFreelancers();
  }, []);

  // Filter freelancers whenever the search term changes
  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((freelancer) => {
        const name = freelancer.fullName || freelancer.fullname || freelancer.name || ""; // ✅ Default value
        return name.toLowerCase().includes(search.toLowerCase());
      });
      console.log("Filtered Freelancers:", filtered);
      setFilteredFreelancers(filtered);
    }
  }, [search, data]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the auth token
    navigate("/signin"); // Navigate to signin page
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-blue-700 min-h-screen text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-lg border border-gray-300/20 rounded-3xl p-10 w-full max-w-5xl shadow-2xl flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center mb-8 text-white">
          Find a Freelancer
        </h1>

        {/* Search Box */}
        <div className="flex items-center bg-gray-200/30 p-4 rounded-full mb-6 w-full max-w-2xl border border-gray-300/20">
          <FaSearch className="text-gray-300 mx-4" />
          <input
            type="text"
            placeholder="Search by name or skill..."
            className="bg-transparent w-full outline-none text-white px-4 placeholder-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {filteredFreelancers.length > 0 ? (
              filteredFreelancers.map((freelancer, index) => (
                <div
                  key={index}
                  className="freelancer-card bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300/10 min-h-[180px]"
                >
                  {/* Freelancer Name */}
                  <h1 className="text-3xl font-semibold mb-2 text-white">
                    {freelancer.fullName || freelancer.fullname || freelancer.name || "No Name"}
                  </h1>

                  {/* Email Link */}
                  <a
                    href={`mailto:${freelancer.email}`}
                    className="text-blue-400 underline"
                  >
                    {freelancer.email || "No Email"}
                  </a>

                  {/* Other Details */}
                  <p className="text-gray-300 mb-1">
                    {freelancer.experience ? `${freelancer.experience} years experience` : "No Experience Info"}
                  </p>
                  <p className="text-blue-300 font-medium mb-1">
                    Expertise: {freelancer.expertiseIn || "Not Specified"}
                  </p>
                  <p className="text-green-300 font-semibold mb-2">
                    {freelancer.hourlyRate ? `$${freelancer.hourlyRate} / hour` : "Rate Not Available"}
                  </p>

                  {/* Portfolio Link */}
                  {freelancer.portfolioURL && (
                    <a
                      href={freelancer.portfolioURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      View Portfolio
                    </a>
                  )}
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
        onClick={handleLogout}
        type="button"
        className="border-2 p-2 mt-3 rounded-2xl bg-blue-500 text-black hover:bg-blue-600"
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
