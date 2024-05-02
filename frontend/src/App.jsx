import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Notes from "./components/Notes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <a href="/">
          <h1>Notes App</h1>        
        </a>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
