import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cadastrar() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password === confirmPassword){
          try {
            const response = await fetch('http://localhost:3001/user/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name: name, password: password })
            });
      
            if (response.ok) {
              alert('user created successfully');
              navigate('/');
            } else {
              alert('Usuário ou senha inválidos');
            }
          } catch (error) {
            console.error('Erro na requisição de cadastro:', error);
            alert('Ocorreu um erro ao tentar cadastrar no servidor. Tente novamente.');
          }
        }else{
          alert('Password e Confirm Password são diferentes !');
        }
    };

    return (
        <body>
            <Navbar />
            <div className="cadastro">
                <h2>Cadastrar</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
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
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
            <Footer />
        </body>
    );
}

export default Cadastrar;
