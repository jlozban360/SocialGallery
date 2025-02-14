import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection';

const ImageDetail = ({ imageId, userId }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/imagenes/${imageId}`)
      .then(response => {
        setImage(response.data);
      })
      .catch(error => {
        console.error('Error fetching image details:', error);
      });
  }, [imageId]);

  if (!image) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <img src={`/uploads/${image.ruta}`} alt={image.descripcion} />
      <p>{image.descripcion}</p>
      <CommentSection imageId={imageId} userId={userId} />
    </div>
  );
};

export default ImageDetail;
