import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import Home from './routes/Home';
import Cadastrar from './routes/Cadastrar'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Entrar from './routes/Entrar';
import { AuthProvider } from './contexts/AuthContext';
import Ranking from './routes/Ranking';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/cadastro",
    element: <Cadastrar/>
  },
  {
    path: "/entrar",
    element: <Entrar/>
  },
  {
    path: "/ranking",
    element: <Ranking/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);
