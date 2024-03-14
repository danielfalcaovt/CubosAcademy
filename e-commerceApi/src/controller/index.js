const express = require("express");
const bodyParser = require("body-parser");
const postRoutes = require("../model/routes/productRoutes/postRoutes");
const authRoutes = require("../model/routes/authRoutes/authRoutes");
const env = require("dotenv");

env.config({ path: "../model/controllers/auth/env" });

const verificarLogin = require("../model/controllers/filtro/verificarLogin");
const { userRoutes } = require("../model/routes/userRoutes/userRoutes");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);

app.use(verificarLogin);

app.use(postRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`App is running in ${port}.`);
});