const postRoutes = require("../productRoutes/postRoutes");
const userResponseFunctions = require("./users/user");

const { Router } = require("express");

const userRoutes = Router();

userRoutes.get("/user", userResponseFunctions.getUser);
userRoutes.put("/user", userResponseFunctions.updateUser);

module.exports = {
  userRoutes
};