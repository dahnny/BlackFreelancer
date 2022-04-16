const express = require("express");
let app = express.Router();
const { login } = require("../services/user.services");

const passport = require("passport");

require("../helpers/login");
require("../helpers/passport");

app.post("/login", async (req, res) => {
  try {
    if (req.isAuthenticated())
      return res
        .status(200)
        .json({ message: "Already signed in", data: req.user });
    await login(req);
    passport.authenticate("local")(req, res, function () {
      res.status(200).json({
        message: "Authentication successful",
        data: req.user,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
