const express = require("express");

class errors {
  error;
  status;

  constructor(error, status) {
    this.error = error;
    this.status = status;
  }

  paramNotFound(res, error, status) {
    return res.status(status).json({ message: `${error} not found.` });
  }
}

const error = new errors();

module.exports = {
  error,
};
