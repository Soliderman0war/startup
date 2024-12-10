import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /> </PrivateRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={
        <Signup /> } />
      <Route path="/about" element={<PrivateRoute>
        <About /> </PrivateRoute>} />
    </Routes>
  );
};

export default App;
