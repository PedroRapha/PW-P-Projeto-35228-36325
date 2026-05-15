const express = require("express");
const router = express.Router();

// Importa o controller
const UsuarioController = require("../controllers/userController");


// 🔹 ROTA DE REGISTO
// POST /api/auth/register
router.post("/register", UsuarioController.register);


// 🔹 ROTA DE LOGIN
// POST /api/auth/login
router.post("/login", UsuarioController.login);


module.exports = router;