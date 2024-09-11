import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';
import {Game} from "./pages/game/game.jsx"; // Garde les styles généraux

const App = () => {
  return (
    <Router>
      <div>
        <header className="app-header">
          <h1>La pâtisserie 3WA</h1>
          <nav>
            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <Game/>
        <Routes>
          {/*<Route path="/home" element={<Home />} />*/}
          {/*<Route path="/login" element={<Login />} />*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
