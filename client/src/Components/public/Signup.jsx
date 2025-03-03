import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleSignUp = async () => {
    setLoading(true);
    try {
      let apiUrl = "http://localhost:6060/api/public/usersignup";
      let apiOutput = await axios.post(apiUrl, { email, password });

      console.log("API RESPONSE", apiOutput.data);

     navigate("/signin")
    } catch (error) {
      console.log("Signup error:", error.response?.data || "An error occurred"); // ✅ Fixed typo
      setMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="border-3 border-blue-800 rounded-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h3 className="text-white font-semibold text-2xl text-center">
          Create an Account
        </h3>


        <div className="w-full mt-6">
          <label className="text-white font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800"
            placeholder="Enter Username.."
          />
        </div>



        <div className="w-full mt-6">
          <label className="text-white font-semibold">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800"
            placeholder="Enter Your Email.."
          />
        </div>

        <div className="w-full mt-4">
          <label className="text-white font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white border-2 w-full mt-2 p-2 rounded-xl border-gray-600 bg-gray-800"
            placeholder="Enter Password.."
          />
        </div>

        <button
          type="button"
          onClick={handleSignUp}
          disabled={loading}
          className="mt-6 w-full h-10 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>

       

        <h5 className="text-white mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 underline">
            Sign in Here!
          </a>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
