import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Slideshow from './components/Slideshow';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ImageDetail from './components/ImageDetail';
import './styles/styles.css';

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUserId && storedUsername) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (user) => {
    setUserId(user.id);
  };

  const handleRegister = (user) => {
    setUserId(user.id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUserId(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          {userId ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <span>Bienvenido, {localStorage.getItem('username')}</span>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Iniciar Sesión</Link>
              <Link to="/registro">Registrarse</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Slideshow userId={userId} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Register onRegister={handleRegister} />} />
          <Route path="/perfil" element={<Profile userId={userId} />} />
          <Route path="/imagen/:id" element={<ImageDetail userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
