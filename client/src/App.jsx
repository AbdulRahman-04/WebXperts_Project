import React from "react";
import Signup from "./Components/public/Signup";
import Signin from "./Components/public/Signin";
import FreelancerSearch from "./Components/private/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/public/NotFound";
import Home from "./Components/public/Home";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<FreelancerSearch />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
