import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/usuarios/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setError('Error al cargar el perfil del usuario');
      });

    axios.get(`http://localhost:5000/api/imagenes/usuario/${userId}`)
      .then(response => setImages(response.data))
      .catch(error => console.error('Error fetching user images:', error));
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Cargando...</div>;

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.nombre} {user.apellidos}</p>
      <p><strong>Usuario:</strong> {user.usuario}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Fecha de Alta:</strong> {new Date(user.fecha_alta).toLocaleString()}</p>

      <h3>Mis Imágenes</h3>
      {images.length > 0 ? (
        <div className="profile-images">
          {images.map(image => (
            <div key={image.id} className="image-card">
              <img src={`/uploads/${image.ruta}`} alt={image.descripcion} />
              <p>{image.descripcion}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aún no has subido imágenes.</p>
      )}
    </div>
  );
};

export default Profile;
