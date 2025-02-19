import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {
      // Fetch user profile
      axios.get(`http://localhost:5000/api/usuarios/${userId}`)
        .then(response => setUser(response.data))
        .catch(error => {
          console.error('Error fetching user profile:', error);
          setError('Error al cargar el perfil del usuario');
        });

      // Fetch user images
      axios.get(`http://localhost:5000/api/imagenes/usuario/${userId}`)
        .then(response => {
          console.log("Images data:", response.data);
          setImages(response.data);
        })
        .catch(error => {
          console.error('Error fetching user images:', error);
          setError('Error al cargar las imágenes del usuario');
        });
    }
  }, [userId]);

  const handleDeleteImage = (imageId) => {
    axios.delete(`http://localhost:5000/api/imagenes/${imageId}`)
      .then(response => {
        console.log(response.data.message);
        setImages(images.filter(image => image.id !== imageId));
      })
      .catch(error => {
        console.error('Error deleting image:', error);
        setError('Error al eliminar la imagen');
      });
  };

  if (error) return <div>{error}</div>;
  if (!user) return <div>Cargando...</div>;

  return (
    <div className="profile-container">
      <h2><u>Perfil de Usuario</u></h2>
      <p><strong>Nombre:</strong> {user.nombre} {user.apellidos}</p>
      <p><strong>Usuario:</strong> {user.usuario}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Fecha de Alta:</strong> {new Date(user.fecha_alta).toLocaleString()}</p>


      <br></br><h3>Mis Imágenes</h3>
      {images.length > 0 ? (
        <div className="profile-images">
          {images.map(image => (
            <div key={image.id} className="image-card">
              <img src={`http://localhost:5000/${image.ruta}`} alt={image.descripcion} />
              <p>{image.descripcion}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteImage(image.id)}
              >
                ❌
              </button>
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
