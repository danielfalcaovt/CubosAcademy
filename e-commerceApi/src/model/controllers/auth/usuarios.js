const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const check = require("../../errors/errors");
const database = require("../../db/dbConnection");

//ROTA DE REGISTRO
const registerUser = async (req, res) => {
  const { nome, email, password, confirmPassword, acceptTerms } = req.body;

  //VALIDAÇÃO DE REGISTRO
  if (!nome) {
    return check.error.paramNotFound(res, nome, 404);
  } else if (!email) {
    return check.error.paramNotFound(res, email, 404);
  } else if (!password) {
    return check.error.paramNotFound(res, password, 404);
  } else if (!confirmPassword) {
    return check.error.paramNotFound(res, confirmPassword, 404);
  } else if (!acceptTerms) {
    return check.error.paramNotFound(res, acceptTerms, 404);
  } else {
    try {
      //VALIDAÇÃO DE USUÁRIO JÁ EXISTENTE
      const { rowCount: quantidadeUsuarios } = await database.query(
        "select * from users where email = $1",
        [email]
      );

      if (quantidadeUsuarios > 0) {
        res.status(400).json({ message: "Usuario já existe." });
      } else if (password === confirmPassword) {
        //CRIPTOGRAFANDO SENHA EM HASH
        const hashSalts = 10;
        bcrypt.hash(password, hashSalts, async (err, hashedPassword) => {
          if (err) {
            res.status(500).json({ message: err.message });
          } else {
            const user = await database.query(
              "INSERT INTO users(nome,email,password,acceptterms) VALUES ($1,$2,$3,$4) RETURNING *",
              [nome, email, hashedPassword, acceptTerms]
            );
            if (user.rows.length > 0) {
              res.status(200).json({ user: user.rows[0] });
            } else {
              res.status(500).json({
                message: "Internal server error.",
              });
            }
          }
        });
      } else {
        res.status(300).json({ message: "Email e/ou senha inválidos." });
      }
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  }
};

module.exports = {
  registerUser,
};
