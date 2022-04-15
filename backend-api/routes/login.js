const express = require("express");
let app = express.Router();

const passport = require("passport");

require("../helpers/passport");
require("../helpers/google");

app.get(
  "/login",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureMessage: true }),
  async (req, res) => {
    res
      .status(200)
      .json({
        message: "Authentication successful",
        data: req.user,
      });
  }
);

module.exports = app;
