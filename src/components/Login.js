import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userLogin } from "../actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const loginPromise = axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });
      loginPromise.then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(userLogin(email, password));
        navigate("/");
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <div id="input-container">
        <div>
          <label id="email-label" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
