const Usuario = require("../models/usuarios.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = (req, res) => {
    const { usuario, email, contraseña, nombre, apellidos } = req.body;

    if (!usuario || !email || !contraseña || !nombre || !apellidos) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Hash de la contraseña con bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contraseña, salt);

    Usuario.crear(usuario, email, hash, nombre, apellidos, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usuario registrado", id: result.insertId });
    });
};

exports.iniciarSesion = (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
    }

    Usuario.obtenerPorUsuario(usuario, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = results[0];

        // Verificar la contraseña con bcryptjs
        const contraseñaValida = bcrypt.compareSync(contraseña, user.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, usuario: user.usuario },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Inicio de sesión exitoso", token });
    });
};

exports.obtenerUsuarios = (req, res) => {
    Usuario.obtenerTodos((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID del usuario" });
    }

    Usuario.obtenerPorId(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(results[0]);
    });
};

exports.eliminarUsuario = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID del usuario" });
    }

    Usuario.eliminar(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado" });
    });
};