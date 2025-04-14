import React, { useState } from "react";

function AdvisoryDashboard() {
  // 🌱 Crop Rotation Advisory States
  const [formData, setFormData] = useState({
    currentCrop: "",
    soilType: ""
  });
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌾 ML-Based Crop Recommendation States
  const [mlInput, setMlInput] = useState({});
  const [recommendedCrop, setRecommendedCrop] = useState("");
  const [mlLoading, setMlLoading] = useState(false);
  const [mlError, setMlError] = useState("");

  // 🌱 Crop Rotation: Handle Form Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🌱 Crop Rotation: Handle Form Submit
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

  // 🌾 ML Crop Recommendation: Handle Form Submit
  const handleCropSubmit = async (e) => {
    e.preventDefault();
    setMlLoading(true);
    setRecommendedCrop("");
    setMlError("");

    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          N: parseFloat(mlInput.N),
          P: parseFloat(mlInput.P),
          K: parseFloat(mlInput.K),
          temperature: parseFloat(mlInput.temperature),
          humidity: parseFloat(mlInput.humidity),
          ph: parseFloat(mlInput.ph),
          rainfall: parseFloat(mlInput.rainfall),
        }),
      });

      if (!response.ok) throw new Error("Flask Server Error");

      const data = await response.json();
      setRecommendedCrop(data.recommended_crop || "No recommendation received.");
    } catch (err) {
      setMlError("⚠️ Unable to fetch crop recommendation. Check your Flask server.");
    } finally {
      setMlLoading(false);
    }
  };

  return (
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

        {/* 🌱 Crop Rotation Form */}
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

        {/* Divider */}
        <hr style={{ margin: "30px 0" }} />

        {/* 🌾 ML Crop Recommendation Form */}
        <h2 style={{ color: "#2d572c" }}>🌾 Crop Recommendation (ML Model)</h2>

        <form onSubmit={handleCropSubmit} style={{ marginBottom: "20px" }}>
          {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((field) => (
            <div key={field}>
              <label>{field}:</label><br />
              <input
                type="number"
                name={field}
                placeholder={field}
                value={mlInput[field] || ""}
                onChange={(e) => setMlInput({ ...mlInput, [field]: e.target.value })}
                required
                style={{
                  padding: "8px",
                  width: "250px",
                  marginBottom: "10px",
                  borderRadius: "5px"
                }}
              /><br />
            </div>
          ))}
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              backgroundColor: "#2196f3",
              color: "#fff",
              border: "none"
            }}
          >
            {mlLoading ? "Predicting..." : "Get Crop Recommendation"}
          </button>
        </form>

        <h3 style={{ color: "#2d572c" }}>🌿 Recommended Crop:</h3>
        <div style={{
          background: "#eef5ee",
          padding: "15px",
          borderRadius: "8px",
          minHeight: "50px"
        }}>
          {mlError ? <span style={{ color: "red" }}>{mlError}</span> : recommendedCrop}
        </div>
      </div>
    </div>
  );
}

export default AdvisoryDashboard;
