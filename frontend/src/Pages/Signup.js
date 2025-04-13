import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // same CSS file used

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Signup successful! ✅ Now login.");
    navigate("/login");
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-box glass" onSubmit={handleSignup}>
        <h2>Create Account 🌱</h2>
        <p className="subtitle">Signup to get smart crop advice</p>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>
        <p className="auth-toggle">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
