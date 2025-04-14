import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdvisoryDashboard from "./Pages/AdvisoryDashboard";

function App() {
  const [formData, setFormData] = useState({
    currentCrop: "",
    soilType: ""
  });

  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔑 Dynamically check authentication
  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAdvice("");
    setError("");

    try {
      const response = await fetch("http://localhost:4000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      setAdvice(data.recommendation || "No recommendation received.");
    } catch (err) {
      setError("⚠️ Unable to fetch advice. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/AdvisoryDashboard"
          element={
            isAuthenticated() ? (
              <AdvisoryDashboard
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                advice={advice}
                loading={loading}
                error={error}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
