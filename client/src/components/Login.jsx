import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/usuarios/login', { usuario, contraseña })
      .then(response => {
        onLogin(response.data);
        alert('Éxito al iniciar sesión');
        navigate('/'); // Redirigir al inicio después del inicio de sesión exitoso
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Error al iniciar sesión');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
