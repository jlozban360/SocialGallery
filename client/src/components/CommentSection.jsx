import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ imageId, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`/api/comentarios/${imageId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [imageId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/comentarios/agregar', { imagen_id: imageId, usuario_id: userId, texto: newComment })
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div>
      <h3>Comentarios</h3>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.texto}</p>
        </div>
      ))}
      {userId && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Agregar comentario" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button type="submit">Comentar</button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
