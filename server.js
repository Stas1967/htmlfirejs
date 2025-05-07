// filepath: e:\AngularProject\webejs\server.js
const express = require("express");
const path = require("path");

const app = express();

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src"));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "dist")));

// Ruta principal
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
