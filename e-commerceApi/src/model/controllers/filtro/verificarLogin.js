const jwt = require("jsonwebtoken");
const { query } = require("../../db/dbConnection");
const jwtTokenSecret = require("../auth/jwtTokenSecret");

async function getUser(userId) {
  try {
    const foundUser = await query("SELECT * FROM users WHERE id = $1",[userId]);
    if (foundUser.rowCount === 0) {
      return "User not found."
    }else{
      return foundUser.rows[0];
    };
  } catch (error) {
    console.error(error);
    return error.message;
  };
};

function userTokenWordProcessing(userToken) {
  const userTokenProcessed = userToken.replace("Bearer ","").trim();
  return userTokenProcessed
};

async function verificarLogin(req,res,next) {
  const { authorization } = req.headers;

  if (!authorization) {
    console.error({error:"User not authorized"});
    return res
    .status(401)
    .json({message:'Não autorizado.'});
  }else{
    try {
      const userToken = userTokenWordProcessing(authorization);
      const { id } = jwt.verify(userToken, jwtTokenSecret);
      const foundUser = await getUser(id);
      console.log(foundUser);
      const { senha, ...usuario } = foundUser;
      req.usuario = usuario;
      next();
    } catch (error) {
      console.error({error:error.message});
      return res
      .status(400)
      .json({error:error.message});
    };
  };
};

module.exports = verificarLogin
