import React, { useState } from "react";
import axios from "axios";

function SignupPage({ goToLogin }) {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://fullstack-project-4b7d.onrender.com/api/Auth/signup", {
        fullName,
        username,
        password,
      });

      alert("Signup successful!");
      goToLogin();
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div className="main-bg d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card shadow">
        <h1 className="fw-bold mb-3">Create Account</h1>
        <p className="text-muted mb-4">
          Fill in your details to create a new account.
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3 custom-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-2 custom-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <hr className="my-2" />

          <button type="submit" className="btn sign-btn w-100">
            SIGN UP
          </button>
        </form>

        <p className="text-center mt-3 signup-text">
          ALREADY HAVE AN ACCOUNT?{" "}
          <span className="link-text" onClick={goToLogin}>
            SIGN IN
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;