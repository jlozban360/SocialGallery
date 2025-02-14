import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/usuarios/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setError('Error al cargar el perfil del usuario');
      });
  }, [userId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.nombre} {user.apellidos}</p>
      <p><strong>Usuario:</strong> {user.usuario}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Fecha de Alta:</strong> {new Date(user.fecha_alta).toLocaleString()}</p>
    </div>
  );
};

export default Profile;
