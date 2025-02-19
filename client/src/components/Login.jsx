import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/usuarios/login', { usuario, contraseña })
      .then(response => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.usuario);
        onLogin(user);
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
