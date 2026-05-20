const express = require("express");
const router = express.Router();

// Importa o controller
const UsuarioController = require("../controllers/userController");


// 🔹 ROTA DE REGISTO
// POST /auth/register
router.post("/register", UsuarioController.register);


// 🔹 ROTA DE LOGIN
// POST /auth/login
router.post("/login", UsuarioController.login);


module.exports = router;