import React from "react";
import List from "./List";
import Form from "./Form";
import Navbar from "./NavBar";
import { Route, Routes } from "react-router-dom";

const App = () => (
  <div className="App">
    <Navbar />
    <Routes>
      <Route exact path="/" element={<List />} />
      <Route exact path="/contact" element={<Form />} />
      <Route exact path="/contact/:id" element={<Form />} />
    </Routes>
  </div>
);

export default App;
