const Comentario = require("../models/comentarios.model");

const ComentarioController = {
    agregarComentario: (req, res) => {
        const { imagen_id, usuario_id, texto } = req.body;

        if (!imagen_id || !usuario_id || !texto) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        Comentario.agregar(imagen_id, usuario_id, texto, (error, resultado) => {
            if (error) return res.status(500).json({ error: error.message });

            res.json({ message: "Comentario agregado", id: resultado.insertId, imagen_id, usuario_id, texto });
        });
    },

    obtenerComentariosPorImagen: (req, res) => {
        const { imagen_id } = req.params;

        if (!imagen_id) {
            return res.status(400).json({ error: "Se requiere el ID de la imagen" });
        }

        Comentario.obtenerPorImagen(imagen_id, (error, resultados) => {
            if (error) return res.status(500).json({ error: error.message });

            res.json(resultados);
        });
    },

    eliminarComentario: (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Se requiere el ID del comentario" });
        }

        Comentario.eliminar(id, (error, resultado) => {
            if (error) return res.status(500).json({ error: error.message });

            res.json({ message: "Comentario eliminado", id });
        });
    }
};

module.exports = ComentarioController;