// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Carregar o token do localStorage quando o componente for montado
    const storedToken = localStorage.getItem('userToken');
    const storedUsername = localStorage.getItem('username');
    if (storedToken && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setToken(storedToken);
    }

  }, []);

  const login = async (name, tokenLogin) => {
    setIsAuthenticated(true);
    setUsername(name);
    setToken(tokenLogin);
    localStorage.setItem('userToken', tokenLogin);
    localStorage.setItem('username', name);

    try {
      const response = await fetch(`http://localhost:3001/user/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      });
      
      if(response.ok){
        const data = await response.json();
        localStorage.setItem('userId', data.data[0].id);
      }
    }
    catch (error) {
      console.error('Erro na requisição de user id:', error);
      alert('Ocorreu um erro ao tentar fazer requisicao user id');
    }
    
    
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setToken('');
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
