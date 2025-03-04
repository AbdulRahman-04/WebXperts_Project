import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import webXpertz from "../../assets/og_webxpertz.png";

const FLSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      let apiUrl = "http://localhost:6060/api/public/freelancersignin";
      let apiOutput = await axios.post(apiUrl, { email, password });
  
      console.log("API RESPONSE", apiOutput.data);
  
      let token = apiOutput.data.token;
      if (!token) {
        setLoading(false);
        alert("Invalid credentials❌");
        return;
      }
  
      console.log("Token received:", token);
      console.log("Email from API:", apiOutput.data.email);
  
      localStorage.setItem("freelancer", JSON.stringify(apiOutput.data.email || ""));
      localStorage.setItem("token", token);
  
      alert("Logged in successfully ✅");
  
      setTimeout(() => {
        navigate("/fldashboard");
      }, 500);
    } catch (error) {
      console.log("Login error:", error.message, error.response?.data);
      alert("Login failed, please try again ❌");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 w-full max-w-md flex flex-col items-center shadow-lg">
        <img src={webXpertz} alt="WebXpertz Logo" className="w-34 h-34 mb-6" />

        <h3 className="text-white font-semibold text-2xl mb-4 text-center">
          Sign in as Freelancer🙌
        </h3>

        <div className="w-full">
          <label className="text-white font-medium">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-white border-2 w-full mt-2 p-2 rounded-lg border-gray-600 bg-gray-700"
            placeholder="Enter your email..."
          />
        </div>

        <div className="w-full mt-4">
          <label className="text-white font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-white border-2 w-full mt-2 p-2 rounded-lg border-gray-600 bg-gray-700"
            placeholder="Enter your password..."
          />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleSignin}
          className="mt-6 w-full h-10 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <h5 className="text-white mt-4 text-center">
          Don't have an account? <a href="/flsignup" className="text-blue-500 underline">Sign up here!</a>
        </h5>
      </div>
    </div>
  );
};

export default FLSignin;
