import React from "react";
import List from "./List";
import Form from "./Form";
import Navbar from "./NavBar";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userLogin } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  console.log(user);
  if (token != null && user == null) {
    console.log("token");
    axios
      .get("http://127.0.0.1:5000/users", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(userLogin(res.data));
      });
  }

  const isLoggedIn = user != null;
  console.log(isLoggedIn);
  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      {isLoggedIn ? (
        <Routes>
          <Route exact path="/" element={<List />} />
          <Route exact path="/contact" element={<Form />} />
          <Route exact path="/contact/:id" element={<Form />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
