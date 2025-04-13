import React, { useState, useEffect } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

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
            isAuthenticated ? (
              <AdvisoryDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Optional: Inline version of your advisory system (if needed) */}
        {/* <Route
          path="/advisory"
          element={
            <div style={{
              minHeight: "100vh",
              background: "#fffef5",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "40px",
              fontFamily: "'Poppins', sans-serif"
            }}>
              <div style={{ padding: "30px", textAlign: "center" }}>
                <h1 style={{ color: "#2d572c" }}>🌱 Crop Rotation Advisory System</h1>

                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                  <label>Current Crop:</label><br />
                  <input
                    type="text"
                    name="currentCrop"
                    placeholder="e.g., paddy"
                    value={formData.currentCrop}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "8px",
                      width: "250px",
                      marginBottom: "10px",
                      borderRadius: "5px"
                    }}
                  /><br />

                  <label>Soil Type:</label><br />
                  <input
                    type="text"
                    name="soilType"
                    placeholder="e.g., red"
                    value={formData.soilType}
                    onChange={handleChange}
                    required
                    style={{
                      padding: "8px",
                      width: "250px",
                      marginBottom: "10px",
                      borderRadius: "5px"
                    }}
                  /><br />

                  <button
                    type="submit"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "6px",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      border: "none"
                    }}
                  >
                    {loading ? "Fetching..." : "Get Advice"}
                  </button>
                </form>

                <h3 style={{ color: "#2d572c" }}>🧠 Advisory Output:</h3>
                <div style={{
                  background: "#eef5ee",
                  padding: "15px",
                  borderRadius: "8px",
                  minHeight: "50px"
                }}>
                  {error ? <span style={{ color: "red" }}>{error}</span> : advice}
                </div>
              </div>
            </div>
          }
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
