import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userLogin } from "../actions";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("/users", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(userLogin(email, password));
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email already exists. Please try again.");
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div id="input-container">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="error">{error}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>
      <button type="submit">Sign Up!</button>
    </form>
  );
}

export default Signup;
