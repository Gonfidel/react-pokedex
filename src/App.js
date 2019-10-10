import React from "react";
import logo from "./logo.svg";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";
import Pokemon from "./components/pokemon/Pokemon";
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar />
      <div className="body">
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/Pokemon/:pokemonIndex" component={Pokemon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
