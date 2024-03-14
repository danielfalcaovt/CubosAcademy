const { Router } = require("express");
const cadastro = require("./auth/cadastro");
const login = require("./auth/login");

const authRoutes = Router();

authRoutes.get("/", cadastro.registerUser);

authRoutes.post("/login", login.login);

module.exports = authRoutes;