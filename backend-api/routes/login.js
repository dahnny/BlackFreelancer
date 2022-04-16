const express = require("express");
let app = express.Router();
const { login } = require("../services/user.services");

const passport = require("passport");

require("../helpers/login");
require("../helpers/passport");

app.post("/login", async (req, res) => {
  try {
    await login(req);
    passport.authenticate("local")(req, res, function () {
      res.status(200).json({
        message: "Authentication successful",
        data: { authenticationStatus: req.isAuthenticated(), user: req.user },
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

module.exports = app;
