import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, username, logout } = useAuth();

  return (
    <div className="Home">
      <header className="header">
        <h1><a href="/">Sudoku</a></h1>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <p>Olá, <b>{username}</b></p>
                <li><a href="/ranking">Ranking</a></li>
                <li><button onClick={logout}>Sair</button></li>
              </>
            ) : (
              <>
                <li><a href="/cadastro">Cadastrar-se</a></li>
                <li><a href="/entrar">Entrar</a></li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;