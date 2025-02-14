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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/usuarios/registro', { usuario, email, contraseña, nombre, apellidos })
      .then(response => {
        onRegister(response.data);
        alert('Éxito al registrarse');
        navigate('/'); // Redirigir al inicio después del inicio de sesión exitoso
      })
      .catch(error => {
        alert('Error al registrarse');
        console.error('Error registering:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
