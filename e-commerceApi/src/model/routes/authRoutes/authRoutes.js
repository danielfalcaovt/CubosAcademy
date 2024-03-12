const { Router } = require("express");
const cadastro = require("../../controllers/auth/cadastro");
const login = require("../../controllers/auth/login");


const authRoutes = Router();


authRoutes.get("/", cadastro.registerUser);

authRoutes.post("/login", login.login);

module.exports = authRoutes;