import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const dispatch = useDispatch();

  const handleCLick = () => {
    dispatch(logout());
  }
  
  return (
    <Router>
      <div style={{ backgroundColor: '#F4F4F4'}}>
        
        <header className="app-header" style={{height:'15vh'}}>
          <h1>La pâtisserie 3WA</h1>
          <nav>
            <div style={{display:"flex", justifyContent:"center", width:"100%"}}>
              <div style={{display:"flex", justifyContent:"space-between", width:"30%"}}>
                <Link className='my-link' onClick={handleCLick} to="/login">Logout</Link>
                <Link className='my-link' to="/game">Game</Link>
                <Link className='my-link' to="/">Home</Link>
              </div>
            </div>
          </nav>
        </header>
        <main  style={{height:'74.4vh'}}>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        </main> 

        <footer >
          <p>© 2024 3W Academy. All rights reserved.</p>  
        </footer>

      </div>
    </Router>
  );
};

export default App;
