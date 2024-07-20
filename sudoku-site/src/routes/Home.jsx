import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Board from "../components/Board";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const initializeBoards = () => {
  return [
    [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    [
      [0, 2, 0, 6, 0, 8, 0, 0, 0],
      [5, 8, 0, 0, 0, 9, 7, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [3, 7, 0, 0, 0, 0, 5, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 8, 0, 0, 0, 0, 1, 3],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 9, 8, 0, 0, 0, 3, 6],
      [0, 0, 0, 3, 0, 6, 0, 9, 0],
    ],
  ];
};


//resolve o sudoku
const solveSudoku = (board) => {
  const findEmptyPosition = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          return [row, col];
        }
      }
    }
    return null;
  };

  const isSafe = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }

    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const solve = (board) => {
    const position = findEmptyPosition(board);
    if (!position) {
      return true;
    }

    const [row, col] = position;

    for (let num = 1; num <= 9; num++) {
      if (isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (solve(board)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  };

  const solvedBoard = JSON.parse(JSON.stringify(board));
  solve(solvedBoard);
  return solvedBoard;
};

const getRandomBoard = (boards) => {
  const randomIndex = Math.floor(Math.random() * boards.length);
  return boards[randomIndex];
};

const initialBoards = initializeBoards();

function Home() {
  const { isAuthenticated, token } = useAuth();
  const userId = localStorage.userId;
  const [initialBoard, setInitialBoard] = useState(getRandomBoard(initialBoards));
  const [solvedBoard, setSolvedBoard] = useState(solveSudoku(initialBoard));
  const [board, setBoard] = useState(initialBoard);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(10); // default 10 min
  const [timeLeft, setTimeLeft] = useState(selectedTime * 60);
  const [elapsedTime, setElapsedTime] = useState(0); // tempo decorrido
  const navigate = useNavigate();


  const handleChange = (e, rowIndex, colIndex) => {
    const value = parseInt(e.target.value, 10);
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = isNaN(value) ? 0 : value;
    setBoard(newBoard);
  };

  const startGame = () => {
    const newBoard = getRandomBoard(initialBoards);
    setInitialBoard(newBoard);
    setSolvedBoard(solveSudoku(newBoard));
    setBoard(newBoard);
    setTimeLeft(selectedTime * 60);
    setGameStarted(true);
    setElapsedTime(0);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleEndGameByTime = async() =>{
    const id_user = userId;
      const tempo_choosed = (selectedTime * 60).toString();
      const duracao = elapsedTime.toString()

      try {
        const response = await fetch('http://localhost:3001/partida/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id_user: id_user, tempo_choosed: tempo_choosed, duracao: duracao})
        });
  
        if (response.ok) {
          alert('Partida cadastrada!');
          navigate('/');
        } else {
          alert('Atributos de partida inválidos');
        }
      } catch (error) {
        console.error('Erro na requisição de login:', error);
        alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }
  }


  const handleEndGame = async () => {
    if (isValidSudoku(board)) {
      setGameStarted(false);
      alert('Parabéns! Você completou o Sudoku corretamente.');

      const id_user = userId.toString();
      const tempo_choosed = (selectedTime * 60).toString();
      const duracao = elapsedTime.toString()

      try {
        const response = await fetch('http://localhost:3001/partida/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id_user: id_user, tempo_choosed: tempo_choosed, duracao: duracao})
        });
  
        if (response.ok) {
          alert('Partida cadastrada!');
          navigate('/');
        } else {
          alert('Atributos de partida inválidos');
        }
      } catch (error) {
        console.error('Erro na requisição de login:', error);
        alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }

    } else {
      alert('Existem erros no Sudoku. Tente novamente.');
    }
  };

  const isValidSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // verifica se a cell esta correta
        if (board[row][col] === 0 || board[row][col] !== solvedBoard[row][col]) {
          return false;
        }
      }
    }
    return true;
  };



  useEffect(() => {

    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        setElapsedTime(elapsedTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameStarted(false);
      alert('Tempo acabou! Jogo terminado.');
      handleEndGameByTime()
    }
  }, [gameStarted, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <body>
      <Navbar />
      <div className="Jogo">
        {isAuthenticated ? (
          gameStarted ? (
            <div>
              <p>Tempo restante: {formatTime(timeLeft)}</p>
              <p>Tempo decorrido: {formatTime(elapsedTime)}</p>
              <Board board={board} handleChange={handleChange} solvedBoard={solvedBoard} />
              <button onClick={handleEndGame}>Finalizar Jogo</button>
            </div>
          ) : (
            <div>
              <label htmlFor="time-select">Escolha o tempo da partida:</label>
              <select id="time-select" value={selectedTime} onChange={handleTimeChange}>
                <option value={10}>10 minutos</option>
                <option value={20}>20 minutos</option>
                <option value={30}>30 minutos</option>
              </select>
              <button onClick={startGame}>Iniciar Jogo</button>
            </div>
          )
        ) : (
          <p>Por favor, faça login para jogar.</p>
        )}
      </div>
      <Footer />
    </body>
  );
}

export default Home;
