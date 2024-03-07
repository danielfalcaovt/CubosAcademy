const { Router } = require("express");
const usuarios = require("./controllers/auth/usuarios");
const login = require("./controllers/auth/login");
const postRegister = require("./controllers/posts/postRegister");

const routes = Router();

routes.get("/", usuarios.registerUser);

routes.post("/login", login.login);

routes.post("/home",postRegister.postRegister);

module.exports = {
  routes
};
