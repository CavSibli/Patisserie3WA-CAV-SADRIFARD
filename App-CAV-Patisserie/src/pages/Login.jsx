import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');  
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{margin:"10px 20px",background:'white', border:'1px solid grey',display:"flex", flexDirection:'column'}}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:'column', margin:'1px 5px', gap:'10px'}}>
        <label>Email :</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
