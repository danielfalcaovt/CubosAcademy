const query = "../../db/dbConnection";

async function getPosts(req,res) {
  try {

  } catch (error) {
    console.error(error)
    res
    .status(404)
    .json({error:error.message})
  };
};

module.exports = getPosts