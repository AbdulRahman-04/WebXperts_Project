import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const expertiseOptions = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "UI/UX Designer", "Digital Marketer", "SEO Specialist", "Mobile App Developer"
];

const indianCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Pune"];

function FreelancerSearch() {
  const [query, setQuery] = useState("");
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const { data } = await axios.get("https://randomuser.me/api/?results=25&nat=in");
        setFreelancers(data.results.map((user, index) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          expertise: expertiseOptions[index % expertiseOptions.length],
          hourlyRate: `$${Math.floor(Math.random() * 100) + 20}/hr`,
          portfolio: "https://example.com/portfolio",
          contact: user.phone,
          location: `${indianCities[index % indianCities.length]}, India`,
          image: user.picture.large
        })));
      } catch (err) {
        console.error("Error fetching freelancers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  const filteredFreelancers = freelancers.filter(freelancer =>
    freelancer.name.toLowerCase().includes(query.toLowerCase().trim())
  );

  useEffect(() => {
    gsap.from(".freelancer-card", { opacity: 0, y: 20, duration: 0.5, stagger: 0.1 });
  }, [filteredFreelancers]);

  return (
    <div className="w-full min-h-screen p-8 bg-gray-900 text-white flex flex-col items-center">
      <motion.h2 className="text-4xl font-bold mb-6 text-center text-blue-400"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        Find Your Expert Freelancer
      </motion.h2>
      
      <motion.input type="text" placeholder="Search by name" className="w-full max-w-md p-3 border rounded-lg mb-6 bg-gray-800 text-white shadow-sm focus:ring-2 focus:ring-blue-400"
        value={query} onChange={(e) => setQuery(e.target.value)}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      />
      
      {loading ? <p className="text-center text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredFreelancers.length > 0 ? filteredFreelancers.map((freelancer, index) => (
            <motion.div key={index} className={`p-6 rounded-xl shadow-xl freelancer-card ${query && freelancer.name.toLowerCase().includes(query.toLowerCase()) ? "border-2 border-blue-500 bg-gray-800" : "bg-gray-800 border border-gray-700"}`}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/dashboard")}
            >
              <img src={freelancer.image} alt={freelancer.name} className="w-24 h-24 rounded-full mx-auto mb-3 border border-gray-600 shadow-md" />
              <h3 className="text-2xl font-semibold text-blue-300 text-center">{freelancer.name}</h3>
              <p className="text-gray-400 text-center">{freelancer.email}</p>
              <p className="text-sm text-gray-500 text-center">{freelancer.location}</p>
              <p className="text-sm font-medium text-gray-400 text-center">Expertise: {freelancer.expertise}</p>
              <p className="text-sm font-medium text-green-400 text-center">Hourly Rate: {freelancer.hourlyRate}</p>
              <a href={freelancer.portfolio} target="_blank" className="text-blue-400 hover:underline block text-center">Portfolio</a>
              <p className="text-sm text-gray-400 text-center">Contact: {freelancer.contact}</p>
            </motion.div>
          )) : <p className="text-center text-gray-400">No freelancers found. Try searching with a different name.</p>}
        </div>
      )}
    </div>
  );
}

export default FreelancerSearch;
