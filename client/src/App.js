import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Slideshow from './components/Slideshow';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ImageDetail from './components/ImageDetail';
import SubirImagen from './components/UploadImage';
import './styles/App.css';
import './styles/slideshow.css';

const App = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

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
    navigate('/');
  };

  return (
    <div>
      <nav>
        <div>
          <Link to="/">Inicio</Link>
          {userId && <Link to="/perfil">Perfil</Link>}
        </div>
        <div>
          {userId ? (
            <>
              <span className="welcomeMsg">Bienvenido, {localStorage.getItem('username')}</span>
              <button onClick={() => navigate('/subir-imagen')}>Subir Imagen</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
              <button onClick={() => navigate('/registro')}>Registrarse</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Slideshow userId={userId} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Register onRegister={handleRegister} />} />
        <Route path="/perfil" element={<Profile userId={userId} />} />
        <Route path="/imagen/:id" element={<ImageDetail userId={userId} />} />
        <Route path="/subir-imagen" element={<SubirImagen userId={userId} />} />
      </Routes>
    </div>
  );
};

export default App;
