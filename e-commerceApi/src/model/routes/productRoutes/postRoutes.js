const { Router } = require("express");
const postResponseFunctions = require("./posts/posts");

const postRoutes = Router();

// ROTA DE PRODUTOS
postRoutes.get("/produtos", postResponseFunctions.getPosts);
postRoutes.get("/produtos/:id", postResponseFunctions.getPosts);
postRoutes.post("/produtos", postResponseFunctions.registerPost);
postRoutes.put("/produtos/:id", postResponseFunctions.updatePost);

module.exports = postRoutes;