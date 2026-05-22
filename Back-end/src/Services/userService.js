require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const prisma = require("../prisma/prismaClient")
const express = require("express")



// 🔹 Registar utilizador
async function register(name, email, password) {

  // Verifica se já existe utilizador com esse email
  const userExists = await prisma.user.findUnique({
    where: { email }
  });

  if (userExists) {
    const error = new Error("Utilizador já existe")
    error.statusCode = 409
    throw error
  }

  // Encriptar password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Criar utilizador na base de dados
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return {
    name: user.name,
    email: user.email
  };
}


//  Login
async function login(email, password) {

  // Procurar utilizador
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error("Credenciais inválidas")
    error.statusCode = 401
    throw error
  }

  // Comparar password
  const palavra_passe = await bcrypt.compare(password, user.password);
  if (!palavra_passe) {
    const error = new Error("Credenciais inválidas")
    error.statusCode = 401
    throw error
  }

  // Gerar token JWT
  const token = jwt.sign(
    { id: user.id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

module.exports = {
  register,
  login
};