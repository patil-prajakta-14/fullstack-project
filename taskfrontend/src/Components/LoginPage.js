import React, { useState } from "react";
import axios from "axios";

function LoginPage({ setUser, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://fullstack-project-4b7d.onrender.com/api/Auth/login", {
        username,
        password,
      });

      setUser(res.data);
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="main-bg d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card shadow">
        <h1 className="fw-bold mb-3">Hello!</h1>
        <p className="text-muted mb-4">
          Fill in your username and password to sign in.
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            className="form-control mb-3 custom-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-2 custom-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <hr className="my-2" />

          <button type="submit" className="btn sign-btn w-100">
            SIGN IN
          </button>
        </form>

        <p className="text-center mt-3 signup-text">
          DON'T HAVE AN ACCOUNT?{" "}
          <span className="link-text" onClick={goToSignup}>
            SIGN UP NOW!
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;