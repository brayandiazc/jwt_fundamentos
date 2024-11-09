// Importar mongoose
const mongoose = require("mongoose");

// Crear el esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Exportar el modelo de usuario
module.exports = mongoose.model("User", userSchema);
