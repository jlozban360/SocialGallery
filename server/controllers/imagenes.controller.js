const Imagen = require("../models/imagenes.model");

exports.subirImagen = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }

    const { usuario_id, descripcion } = req.body;
    const ruta = req.file.path;

    if (!usuario_id || !descripcion) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    Imagen.subir(ruta, descripcion, usuario_id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Imagen subida", id: result.insertId, ruta });
    });
};

exports.obtenerImagenes = (req, res) => {
    Imagen.obtenerTodas((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

exports.obtenerImagenPorId = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID de la imagen" });
    }

    Imagen.obtenerPorId(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }
        res.json(results[0]);
    });
};

exports.eliminarImagen = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Se requiere el ID de la imagen" });
    }

    Imagen.eliminar(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Imagen no encontrada" });
        }
        res.json({ message: "Imagen eliminada" });
    });
};