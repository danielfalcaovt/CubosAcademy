const express = require("express");
const database = require("../../db/dbConnection");

const postRegister = async (req,res) => {
  try {
    const { postText } = req.body;
    if (postText.length > 0) {
      const postRegisterInDatabase = await database.query("INSERT INTO posts(texto) VALUES($1)",[postText]);
      if (postRegisterInDatabase.rowCount !== 0) {
        const post = postRegisterInDatabase.rows[0];
        res
        .status(200)
        .json({post:post});
      }else{
        res
        .status(500)
        .json({error:"May something goes wrong."})
      }
    }else{
      res
      .status(400)
      .json({error: "Your text can't be empty."});
    };
  } catch (err) {
    res
    .status(404)
    .json({error:err.message})
  };
};

module.exports = {
  postRegister
};