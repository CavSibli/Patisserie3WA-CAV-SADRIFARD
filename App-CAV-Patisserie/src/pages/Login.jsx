import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice'; 
import './Login.module.scss';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Votre e-mail :</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Votre mot de passe :</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;