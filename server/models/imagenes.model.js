const db = require("../config/db");

const Imagen = {
    subir: (ruta, descripcion, usuario_id, callback) => {
        db.query(
            "INSERT INTO imagenes (ruta, descripcion, usuario_id) VALUES (?, ?, ?)",
            [ruta, descripcion, usuario_id],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },

    obtenerTodas: (callback) => {
        db.query("SELECT * FROM imagenes", (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    obtenerPorId: (id, callback) => {
        db.query("SELECT * FROM imagenes WHERE id = ?", [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    obtenerPorUsuario: (usuario_id, callback) => {
        db.query(
            "SELECT id, ruta, descripcion FROM imagenes WHERE usuario_id = ?",
            [usuario_id],
            (err, results) => {
                if (err) return callback(err);
                callback(null, results);
            }
        );
    },

    eliminar: (id, callback) => {
        db.query("DELETE FROM imagenes WHERE id = ?", [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }
};

module.exports = Imagen;
