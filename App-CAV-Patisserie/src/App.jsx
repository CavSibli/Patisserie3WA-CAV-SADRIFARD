import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Login from './pages/login/Login.jsx';
import Home from './pages/Home';
import {logout} from "./features/authSlice.js";
import {Game} from "./pages/game/game.jsx";
import {Admin} from "./pages/admin/admin.jsx";
import './App.css';
const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const handleCLick = () => {
        dispatch(logout());
    }

    return (
        <Router>
            <div>
                <header className="app-header">
                    <h1>La pâtisserie 3WA</h1>
                    <nav>
                        <div>
                            <div>
                                <Link className='my-link' to="/">Home</Link>
                                <Link className='my-link' to="/game">Game</Link>
                                {isAuthenticated && <Link className='my-link' to="/admin">Admin</Link>}
                                {isAuthenticated && <Link className='my-link' onClick={handleCLick} to="/login">Logout</Link>}
                            </div>
                        </div>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/game" element={<Game/>}/>
                        <Route path="/admin" element={<Admin/>}/>
                    </Routes>
                </main>

                <footer>
                    <p>© 2024 3W Academy. All rights reserved.</p>
                </footer>

            </div>
        </Router>
    );
};

export default App;
