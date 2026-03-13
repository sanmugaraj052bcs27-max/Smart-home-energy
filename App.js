import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Home from "./components/Home";
import Contact from "./components/Contact";
import Services from "./components/Services";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/Dashboard";
import Otp from "./components/Otp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


function App() {
  return (
    <Router>

      <Routes>

        {/* default route → Home */}
        <Route path="/" element={
          
            <Home />
         
        } />

        {/* other landing pages */}
        <Route path="/contact" element={
          
            <Contact />
         
        } />

        <Route path="/services" element={
          
            <Services />
          
        } />

        {/* auth pages */}
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/otp" element={<Otp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

    </Router>
  );
}

export default App;
