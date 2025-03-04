import React, { useEffect, useState } from "react";
import axios from "axios";

const FLdashboard = () => {
  const [freelancer, setFreelancer] = useState(null);
  const freelancerId = localStorage.getItem("freelancerId");

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        let apiUrl = `http://localhost:6060/api/private/getonefreelancer/${freelancerId}`;
        let response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setFreelancer(response.data); // API se data set ho raha hai
      } catch (error) {
        console.log("Error fetching freelancer data:", error);
      }
    };

    if (freelancerId) {
      fetchFreelancerData();
    }
  }, [freelancerId]);

  if (!freelancer) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Welcome, {freelancer.name}!</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold">{freelancer.name}</h3>
        <p className="text-gray-400">{freelancer.expertise}</p>
        <p className="text-blue-400 font-semibold">{freelancer.hourlyRate}/hr</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 bg-green-500 rounded-lg text-black text-center">
          <h4 className="text-lg font-semibold">Total Earnings</h4>
          <p className="text-2xl font-bold">${freelancer.earnings}</p>
        </div>
        <div className="p-6 bg-yellow-500 rounded-lg text-black text-center">
          <h4 className="text-lg font-semibold">Active Projects</h4>
          <p className="text-2xl font-bold">{freelancer.activeProjects}</p>
        </div>
        <div className="p-6 bg-blue-500 rounded-lg text-black text-center">
          <h4 className="text-lg font-semibold">Completed Projects</h4>
          <p className="text-2xl font-bold">{freelancer.completedProjects}</p>
        </div>
      </div>
    </div>
  );
};

export default FLdashboard;
