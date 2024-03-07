const express = require("express");
const pg = require("pg");

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "CodeAcademy",
  password: "brbr109br",
  port: 5432,
});

db.connect();

const query = (txt, param) => {
  return db.query(txt, param);
};

module.exports = {
  query,
};
