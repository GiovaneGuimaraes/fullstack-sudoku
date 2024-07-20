import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from '../contexts/AuthContext';

function Entrar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: username, password: password })
      });

      if (response.ok) {
        const data = await response.json();
        const tokenLogin = data.token;
        await login(username, tokenLogin);
        alert('Login bem-sucedido!');
        navigate('/');
      } else {
        alert('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <body>
      <Navbar />
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <Footer />
    </body>
  );
}

export default Entrar;