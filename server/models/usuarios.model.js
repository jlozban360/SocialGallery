const db = require("../config/db");

const Usuario = {
    crear: (usuario, email, contraseña, nombre, apellidos, callback) => {
        db.query(
            "INSERT INTO usuarios (usuario, email, contraseña, nombre, apellidos) VALUES (?, ?, ?, ?, ?)",
            [usuario, email, contraseña, nombre, apellidos],
            (err, result) => {
                if (err) return callback(err);
                callback(null, result);
            }
        );
    },

    obtenerTodos: (callback) => {
        db.query("SELECT id, usuario, nombre, apellidos, fecha_alta FROM usuarios", (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    obtenerPorId: (id, callback) => {
        db.query("SELECT id, usuario, nombre, apellidos, fecha_alta FROM usuarios WHERE id = ?", [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    eliminar: (id, callback) => {
        db.query("DELETE FROM usuarios WHERE id = ?", [id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    obtenerPorUsuario: (usuario, callback) => {
        db.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    }
};

module.exports = Usuario;