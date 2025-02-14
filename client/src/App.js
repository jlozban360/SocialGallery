import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Slideshow from './components/Slideshow';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ImageDetail from './components/ImageDetail';
import UploadImage from './components/UploadImage'; // Importar el componente de subir imagen
import './styles/styles.css';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');

    if (token && storedUserId && storedUsername) {
      setUserId(storedUserId);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = (user) => {
    setUserId(user.id);
    setUsername(user.usuario);
  };

  const handleRegister = (user) => {
    setUserId(user.id);
    setUsername(user.usuario);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    setUserId(null);
    setUsername(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          {userId ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <span>Bienvenido, {username}</span>
              <Link to="/subir-imagen">
                <button>Subir Imagen</button>
              </Link>
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
          <Route path="/" element={<Slideshow />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registro" element={<Register onRegister={handleRegister} />} />
          <Route path="/perfil" element={<Profile userId={userId} />} />
          <Route path="/imagen/:id" element={<ImageDetail userId={userId} />} />
          <Route path="/subir-imagen" element={<UploadImage userId={userId} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
