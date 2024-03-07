const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../model/routes");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use(routes.routes);

app.listen(port, () => {
  console.log("App is running...");
});
