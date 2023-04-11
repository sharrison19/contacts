import React from "react";
import List from "./List";
import Form from "./Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  </BrowserRouter>
);

export default App;
