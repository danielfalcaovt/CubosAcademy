function getUser(req, res) {
  try {
    res
    .status(200)
    .json({ user: req.usuario });
  } catch (error) {
    res.status(404).json({ error: error.message });
  };
};

module.exports = getUser;