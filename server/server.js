const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Servir imágenes

// Importar rutas
const usuarioRoutes = require("./routes/usuarios.routes");
const imagenRoutes = require("./routes/imagenes.routes");
const comentarioRoutes = require("./routes/comentarios.routes");

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/imagenes", imagenRoutes);
app.use("/api/comentarios", comentarioRoutes);

app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
