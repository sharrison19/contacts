import React from "react";
import List from "./List";
import Form from "./Form";
import Navbar from "./NavBar";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";

const App = () => (
  <div className="App">
    <Navbar />
    <Routes>
      <Route exact path="/" element={<List />} />
      <Route exact path="/contact" element={<Form />} />
      <Route exact path="/contact/:id" element={<Form />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  </div>
);

export default App;
