import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/registro', {
        usuario,
        email,
        contraseña,
        nombre,
        apellidos,
      });
  
      console.log('Respuesta completa del servidor:', response);
      console.log('Contenido de response.data:', response.data);
  
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Respuesta inválida del servidor: Falta token o user');
      }
  
      const { token, user } = response.data;
  
      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', user.usuario);
  
      // Actualizar estado global en App.js
      onRegister(user);
  
      alert('Registro exitoso');
      navigate('/');
    } catch (error) {
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
      alert('Error al registrarse. Revisa la consola.');
    }
  };  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
