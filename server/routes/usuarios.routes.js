const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller");

router.post("/registro", usuarioController.registrarUsuario);
router.post("/login", usuarioController.iniciarSesion);
router.get("/", usuarioController.obtenerUsuarios);
router.get("/:id", usuarioController.obtenerUsuarioPorId);
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;
