//Importamos librerías
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Declaramos un arreglo para asignar el resultado de usuarios temporales
const users = [];

// Función POST para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  //Validamos que usaurio NO exista, caso contrario finalizamos el flujo.
  const userExists = users.find((user) => user.username === username);
  if (userExists)
    return res.status(400).json({ message: "Usuario ya registrado" });

  //Ciframos el valor del password ingresado
  const hashedPassword = await bcrypt.hash(password, 10);

  //Agregamos el nuevo usuario al arreglo de users
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  //Retornamos el éxito de registro con status 201.
  res.status(201).json({ message: "Usuario registrado exitosamente" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token requerido" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token inválido" });
    req.user = decoded;
    next();
  });
};

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username}! Acceso permitido.` });
});

module.exports = router;
