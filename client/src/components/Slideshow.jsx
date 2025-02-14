import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/styles.css';

const Slideshow = () => {
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
    return <div className="no-images">No hay imágenes disponibles.</div>;
  }

  return (
    <div className="slideshow">
      <div className="slideshow-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="slide">
            <img src={`/uploads/${image.ruta}`} alt={image.descripcion} />
          </div>
        ))}
      </div>
      <button onClick={goToPrevious} className="prev-button">Anterior</button>
      <button onClick={goToNext} className="next-button">Siguiente</button>
    </div>
  );
};

export default Slideshow;
