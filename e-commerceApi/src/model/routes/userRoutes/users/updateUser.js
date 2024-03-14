const { query } = require("../../../db/dbConnection");
const bcrypt = require("bcryptjs");

function missingAllParams(nome, email, password) {
  if (!nome || !email || !password) {
    return false;
  } else {
    return true;
  }
}

async function checkIfAlreadyExistEmailInDatabase(email) {
  try {
    const databaseResponse = await query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (databaseResponse.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return true;
  }
};

async function updateUser(req, res) {
  const { id } = req.usuario;
  const { nome, email, password } = req.body;
  if (missingAllParams(nome, email, password)) {
    res.status(404).json({ error: "Missing at least a param." });
  }
  try {
    const body = {};
    const params = [];
    let n = 1;

    if (nome) {
      console.log("Has nome");
      body.nome = nome;
      params.push(`nome = $${n}`);
      n++;
    }
    if (email) {
      const emailExist = await checkIfAlreadyExistEmailInDatabase(email);
      if (!emailExist) {
        const lastEmail = req.usuario.email;
        if (lastEmail !== email){
          body.email = email;
          params.push(`email = $${n}`);
          n++;
        }else{
          res.status(404).json({ error: "Email may be different." });
        }
      } else {
        res.status(404).json({ error: "Email already exist." });
      }
    } 
    if (password) {
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          res.status(500).json({ err: err.message });
        } else {
          body.password = hashedPassword;
        }
      });
      params.push(`password = $${n}`);
      n++;
    }
    const bodyParams = Object.values(body);
    const bodyKeys = Object.keys(body);
    let updateQuery = `UPDATE users SET`;
    for (let pos in bodyKeys) {
      updateQuery += ` ${params[pos]}`;
      if (pos != bodyKeys.length -1) {
        updateQuery += `,`
      }
    }
    updateQuery += ` WHERE id = '${id}'`;
    const updatedUser = await query(updateQuery,bodyKeys);
    if (updatedUser.rows.length > 0) {
      console.log(updatedUser.rows);
      res.status(200).json({user:updatedUser.rows[0]})
    } else {
      res.status(500).json({error:"Internal Server Error."});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = updateUser;
