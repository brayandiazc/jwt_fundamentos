// Importamos librerias
const express = require("express");
const dotenv = require("dotenv");

// Usamos variables de entorno dotenv
dotenv.config();

// Usamos express y retornar un json
const app = express();
app.use(express.json());

// Importa las rutas de ./auth
const authRoutes = require("./auth");
app.use("/api/auth", authRoutes);

// Definimos puerto
const PORT = process.env.PORT || 3000;

// Escuchamos al PORT y regresa un console.log con las rutas
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Rutas disponibles:`);
  console.log(`Registro: http://localhost:${PORT}/api/auth/register (POST)`);
  console.log(`Login: http://localhost:${PORT}/api/auth/login (POST)`);
  console.log(
    `Ruta protegida: http://localhost:${PORT}/api/auth/protected (GET, requiere token)`
  );
});
