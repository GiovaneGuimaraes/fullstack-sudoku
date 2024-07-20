import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from '../contexts/AuthContext';
import '../ranking.css';

function Ranking() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [ranking10Min, setRanking10Min] = useState([]);
  const [ranking20Min, setRanking20Min] = useState([]);
  const [ranking30Min, setRanking30Min] = useState([]);

  useEffect(() => {
    const carregaUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3001/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    };

    const carregaRanking = async () => {
      try {
        const response = await fetch('http://localhost:3001/partida/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        const calculateMedia = (entries) => {
          const userMap = {};
          entries.forEach(entry => {
            const { id_user, duracao } = entry;
            if (!userMap[id_user]) {
              userMap[id_user] = { totalDuration: 0, count: 0 };
            }
            userMap[id_user].totalDuration += parseInt(duracao, 10);
            userMap[id_user].count += 1;
          });

          return Object.keys(userMap).map(userId => ({
            id_user: userId,
            averageDuration: userMap[userId].totalDuration / userMap[userId].count
          })).sort((a, b) => a.averageDuration - b.averageDuration);
        };

        const data10Min = calculateMedia(data.data.filter(entry => entry.tempo_choosed === '600'));
        const data20Min = calculateMedia(data.data.filter(entry => entry.tempo_choosed === '1200'));
        const data30Min = calculateMedia(data.data.filter(entry => entry.tempo_choosed === '1800'));

        setRanking10Min(data10Min);
        setRanking20Min(data20Min);
        setRanking30Min(data30Min);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      }
    };

    carregaUsuarios();
    carregaRanking();
  }, [token]);

  const getUserName = (id_user) => {
    const user = users.find(user => user.id === parseInt(id_user, 10));
    return user ? user.name : 'Desconhecido';
  };

  const renderTable = (title, data) => (
    <div className="ranking-section">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>ID Usuário</th>
            <th>Nome</th>
            <th>Média de Duração (segundos)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={entry.id_user}>
              <td>{index + 1}</td>
              <td>{entry.id_user}</td>
              <td>{getUserName(entry.id_user)}</td>
              <td>{entry.averageDuration.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <body>
      <Navbar />
      <div className="ranking-container">
        <h1>Ranking</h1>
        <div className="rankings">
          {renderTable('Ranking 10 Minutos', ranking10Min)}
          {renderTable('Ranking 20 Minutos', ranking20Min)}
          {renderTable('Ranking 30 Minutos', ranking30Min)}
        </div>
      </div>
      <Footer />
    </body>
  );
}

export default Ranking;
