import React from "react";
import Signup from "./Components/public/Signup";
import Signin from "./Components/public/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/public/NotFound";
import Home from "./Components/public/Home";
import Dashboard from "./Components/private/Dashboard";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
