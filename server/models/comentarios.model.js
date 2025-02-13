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
            "SELECT * FROM comentarios WHERE imagen_id = ?",
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