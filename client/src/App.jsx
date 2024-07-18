import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import Login from "../src/pages/Login.jsx";
import Signup from "../src/pages/Signup.jsx";
import AddEditNotes from "./components/AddEditNotes.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Landing />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/addnote" exact element={<AddEditNotes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
