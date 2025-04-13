import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      formData.email === storedUser.email &&
      formData.password === storedUser.password
    ) {
      alert("Login successful");
      if (formData.remember) {
        localStorage.setItem("rememberedUser", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberedUser");
      }
      navigate("/AdvisoryDashboard"); // Navigate here after login
    } else {
      alert("Invalid credentials");
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset feature is coming soon!");
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box glass" onSubmit={handleLogin}>
        <h2>Welcome Back 🌿</h2>
        <p className="subtitle">Log in to your Crop Rotation Portal</p>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@domain.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="auth-options">
          <label className="remember-label">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember Me
          </label>
          <span
            className="forgot-password"
            onClick={handleForgotPassword}
            style={{ cursor: "pointer", color: "#007bff" }}
          >
            Forgot Password?
          </span>
        </div>

        <button type="submit">Login</button>
        <p className="auth-toggle">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} style={{ cursor: "pointer", color: "#007bff" }}>
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
