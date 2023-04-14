import React from "react";
import List from "./List";
import Form from "./Form";
import Navbar from "./NavBar";
import { Route, Routes } from "react-router-dom";
import EditContact from "./EditContact";

const App = () => (
  <div className="App">
    <Navbar>
      <Routes>
        <Route exact path="/" component={() => <List />} />
        <Route exact path="/form" component={() => <Form />} />
        <Route exact path="/edit/:id" component={() => <EditContact />} />
      </Routes>
    </Navbar>
  </div>
);

export default App;
