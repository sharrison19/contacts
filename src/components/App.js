import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import List from "./List";
import Form from "./Form";
import Navbar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import { userLogin } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.user);
  const isLoggedIn = user !== null;

  useEffect(() => {
    if (token && !user) {
      axios
        .get("/users", {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((res) => {
          dispatch(userLogin(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, user]);

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<List />} />
            <Route exact path="/contact" element={<Form />} />
            <Route exact path="/contact/:id" element={<Form />} />
          </>
        ) : (
          <Route path="/*" element={<Login />} />
        )}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
