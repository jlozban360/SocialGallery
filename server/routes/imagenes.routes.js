const express = require("express");
const router = express.Router();
const imagenController = require("../controllers/imagenes.controller");
const multer = require("multer");
const path = require("path");

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Crear la carpeta "uploads" si no existe
const fs = require("fs");
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Rutas
router.post("/subir", upload.single("imagen"), imagenController.subirImagen);
router.get("/", imagenController.obtenerImagenes);
router.get("/:id", imagenController.obtenerImagenPorId);
router.delete("/:id", imagenController.eliminarImagen);

module.exports = router;