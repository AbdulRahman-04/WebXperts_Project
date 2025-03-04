import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { FaSearch } from "react-icons/fa";

const freelancers = [
  {
    name: "Ismail Mohammed",
    email: "survivorismail@gmail.com",
    city: "Mahboob Nagar",
    country: "India",
    specialistIn: "Frontend Developer",
    hourlyRate: "$15/hr",
    portfolio: "https://survivor.dev",
  },
  {
    name: "Sneha Birajdar",
    email: "snehabirajdar72@gmail.com",
    city: "Hyderabad",
    country: "India",
    specialistIn: "Full Stack Devoloper",
    hourlyRate: "$20/hr",
    portfolio: "https://sneha.pro",
  },
  {
    name: "Syed Omer Ali",
    email: "omer76@gmail.com",
    city: "Hyderabad",
    country: "India",
    specialistIn: "Full Stack Development",
    hourlyRate: "$6/hr",
    portfolio: "https://omer.in",
  },
  {
    name: "Fatimah",
    email: "fatimah86@gmail.com",
    city: "Hyderabad",
    country: "India",
    specialistIn: "Web Development",
    hourlyRate: "$4/hr",
    portfolio: "https://fatimah.dev",
  },
  // Add more freelancers here
];

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [filteredFreelancers, setFilteredFreelancers] = useState(freelancers);

  useEffect(() => {
    gsap.from(".freelancer-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    });
  }, [filteredFreelancers]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilteredFreelancers(
        freelancers.filter(
          (freelancer) =>
            freelancer.name.toLowerCase().includes(search.toLowerCase().trim()) ||
            freelancer.specialistIn.toLowerCase().includes(search.toLowerCase().trim())
        )
      );
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="bg-gradient-to-r from-purple-700 to-blue-700 min-h-screen text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg border border-gray-300/20 rounded-3xl p-10 w-full max-w-5xl shadow-2xl flex flex-col items-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 text-white"
        >
          Find a Freelancer
        </motion.h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {filteredFreelancers.length > 0 ? (
            filteredFreelancers.map((freelancer, index) => (
              <motion.div
                key={index}
                className="freelancer-card bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-300/10"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h2 className="text-3xl font-semibold mb-2 text-white">{freelancer.name}</h2>
                <p className="text-gray-200 mb-1">{freelancer.email}</p>
                <p className="text-gray-300 mb-1">
                  {freelancer.city}, {freelancer.country}
                </p>
                <p className="text-blue-300 font-medium mb-1">{freelancer.specialistIn}</p>
                <p className="text-green-300 font-semibold mb-2">{freelancer.hourlyRate}</p>
                <a
                  href={freelancer.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View Portfolio
                </a>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No freelancers found.
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;