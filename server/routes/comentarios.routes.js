const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarios.controller");

router.post("/agregar", comentarioController.agregarComentario);
router.get("/:imagen_id", comentarioController.obtenerComentariosPorImagen);
router.delete("/:id", comentarioController.eliminarComentario);

module.exports = router;