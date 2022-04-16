const express = require("express");
const app = express.Router();
const authenticate = require("../middlewares/authenticator");

const {
  get,
  getById,
  update,
} = require("../services/user.services");


// find all users
app.get("/", authenticate, async (req, res, next) => {
  try {
    const data = await get();
    return res.status(200).json({ message: "Retrieved Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});


// find user by id
app.get("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getById({ id });
    return res
      .status(200)
      .json({ message: "Retrieved Successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});


// edit user
app.put("/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.user.id)
    if (id !== req.user.id) throw new Error("Not the owner of document");
    await update(req.body, id);
    return res
      .status(200)
      .json({ message: "Updated User Successfully", data: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
