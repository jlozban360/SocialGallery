import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Slideshow from './components/Slideshow';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ImageDetail from './components/ImageDetail';
import './styles/styles.css';

const App = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = (user) => {
    setUserId(user.id);
  };

  const handleRegister = (user) => {
    setUserId(user.id);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          {userId ? (
            <>
              <Link to="/perfil">Perfil</Link>
              <span>Bienvenido, Usuario</span>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
