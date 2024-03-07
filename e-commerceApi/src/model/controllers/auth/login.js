const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../../db/dbConnection");
const pass = require("../../../controller/jwtTokenGen");

function emailAndPasswordCheck(email,password) {
  !email && !password ? false : true
};

async function checkIfUserExist(email) {
  const foundUserInDatabase = await database.query("SELECT * FROM users WHERE email = $1",[email]);
  return foundUserInDatabase;
};

async function compareIfPasswordIsCorrect(password, userFound) {
  bcrypt.compare(password, userFound.password, (err, match) => {
    if (err) {
      return res.status(500).json({ err: "Internal server error." });
    } else if (!err && match === true) {
      const token = jwt.sign({ id:userFound.id }, pass, {
        expiresIn: "1hr",
      });
      const { password: _, ...userData } = userFound;
      return res.status(200).json({
        user: userData,
        token
      });
    } else {
      return res.status(300).json({
        error: "Wrong password, Try again...",
      });
    };
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (emailAndPasswordCheck(email, password)) {
      res.status(300).json({
        error: "Email and password can not be empty.",
      });
    } else {
      const foundUserResponse = await checkIfUserExist(email);
      if (foundUserResponse.rowCount !== 0) {
        const userFound = foundUserResponse.rows[0];
        compareIfPasswordIsCorrect(password,userFound);
      } else {
        res.status(400).json({ error: "User not found." });
      };
    };
  } catch (err) {
    res.status(404).json({ error: err.message });
  };
};

module.exports = {
  login,
  checkIfUserExist
};