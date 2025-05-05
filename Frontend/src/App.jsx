import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Floweditor from "./components/Floweditor";
import SimulatorPage from "./pages/StimulatorPage";

import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOtp";
import Login from "./pages/Login";

function App() {
  return (
   
      <div className="min-h-screen bg-gray-100 text-gray-900 font-Josefin">
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />

        {/* 🧭 Shared Header */}
   

        <Routes>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="floweditor" element={<Floweditor />} />
            <Route path="simulator" element={<SimulatorPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </div>
   
  );
}

export default App;