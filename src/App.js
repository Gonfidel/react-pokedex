import React from "react";
import logo from "./logo.svg";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";

function App() {
  return (
    <div className="body">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
