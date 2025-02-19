const db = require("../config/db");

const Comentario = {
    agregar: (imagen_id, usuario_id, texto, callback) => {
        db.query(
            "INSERT INTO comentarios (imagen_id, usuario_id, texto) VALUES (?, ?, ?)",
            [imagen_id, usuario_id, texto],
            (error, resultados) => {
                if (error) return callback(error);
                callback(null, resultados);
            }
        );
    },

    obtenerPorImagen: (imagen_id, callback) => {
        db.query(
            `SELECT comentarios.*, usuarios.nombre AS usuario, comentarios.fecha_comentario AS fecha
             FROM comentarios
             JOIN usuarios ON comentarios.usuario_id = usuarios.id
             WHERE imagen_id = ?
             ORDER BY fecha_comentario DESC`,
            [imagen_id],
            (error, resultados) => {
                if (error) return callback(error);
                callback(null, resultados);
            }
        );
    },

    eliminar: (id, callback) => {
        db.query(
            "DELETE FROM comentarios WHERE id = ?",
            [id],
            (error, resultados) => {
                if (error) return callback(error);
                callback(null, resultados);
            }
        );
    }
};

module.exports = Comentario;
