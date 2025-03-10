import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentSection from './CommentSection'; // Asegúrate de importar el componente CommentSection

const Slideshow = ({ userId }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/imagenes')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (images.length === 0) {
    return <div className="no-images">No hay imágenes subidas aún, sé el primero!.</div>;
  }

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow">
        <div className="slideshow-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="slide">
              <img src={`http://localhost:5000/${image.ruta}`} alt={image.descripcion} />
            </div>
          ))}
        </div>
      </div>
  
      <div className="navigation-buttons">
        <button onClick={goToPrevious} className="prev-button">&lt;</button>
        <button onClick={goToNext} className="next-button">&gt;</button>
      </div>
  
      {userId ? (
        <CommentSection imageId={images[currentIndex].id} userId={userId} />
      ) : (
        <div className="comment-login-message">
          <p>Ingresa con tu usuario para comentar y ver los comentarios</p>
        </div>
      )}
    </div>
  );
  
};

export default Slideshow;
