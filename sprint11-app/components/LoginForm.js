import React, { useState } from "react";
import PropTypes from "prop-types";

export default function LoginForm({ setUser, setSpinner }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3 || password.trim().length < 8) {
      setError("Username must be ≥ 3 and password ≥ 8 characters");
      return;
    }

    setSpinner(true);
    try {
      const res = await fetch("http://localhost:9000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      setUser(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p role="alert">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setSpinner: PropTypes.func.isRequired,
};
