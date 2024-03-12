const express = require("express");
const query = require("../../../db/dbConnection");

const postModify = async (req, res) => {
  try {
    const { postId, postText } = req.body;
    const checkIfPostExist = await query("SELECT * FROM posts WHERE id = $1 RETURNING *",[postId]);
    if (checkIfPostExist.rowCount !== 0) {
      const modifiedPost = await query("UPDATE posts SET texto = $1 WHERE id = $2",[postText,postId]);
    }else{
      res
      .status(404)
      .json({error:"Post may not exist."})
    }
  }catch (err) {
    res
    .status(404)
    .json({error:err.message});
  };
};

module.exports = postModify
