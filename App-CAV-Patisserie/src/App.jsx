import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div>
        <header className="app-header">
          <h1>La pâtisserie 3WA</h1>
          <nav>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;