// Importamos librerías
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User"); // Importar el modelo de usuario

// Función POST para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validamos que el usuario NO exista en la base de datos
    const userExists = await User.findOne({ username });
    if (userExists)
      return res.status(400).json({ message: "Usuario ya registrado" });

    // Ciframos el valor del password ingresado
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en MongoDB
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Retornamos el éxito de registro con status 201
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error });
  }
});

// Función POST para iniciar sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscamos al usuario en la base de datos
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    // Validamos que la contraseña sea correcta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Se firma el TOKEN y se asigna un tiempo de expiración
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Regresa el token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
});

// Función para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

// Ruta protegida
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username}! Acceso permitido.` });
});

//Exportamos el módulo
module.exports = router;
