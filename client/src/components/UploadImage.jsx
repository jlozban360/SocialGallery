import React, { useState } from 'react';
import axios from 'axios';

const SubirImagen = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !descripcion) {
      setMensaje('Por favor, selecciona una imagen y agrega una descripción.');
      return;
    }

    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('descripcion', descripcion);
    formData.append('usuario_id', userId);

    try {
      const response = await axios.post('http://localhost:5000/api/imagenes/subir', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Response:', response.data); // Use the response
      setMensaje('Imagen subida con éxito.');
      setFile(null);
      setDescripcion('');
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      setMensaje('Error al subir la imagen.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Subir Imagen</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Subir Imagen</button>
      </form>
    </div>
  );
};

export default SubirImagen;
