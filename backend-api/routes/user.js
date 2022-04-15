const express = require("express");
const app = express.Router();
const authenticate = require("../middlewares/authenticator");

const {
  getUsers,
  getUserById,
  updateUser,
} = require("../services/user.services");


// find all users
app.get("/", authenticate, async (req, res, next) => {
  try {
    const data = await getUsers();
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
    const user = await getUserById({ id });
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
    if (id !== req.user._id) throw new Error("Not the owner of document");
    const response = await updateUser(req.body, id);
    return res
      .status(200)
      .json({ message: "Updated User Successfully", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
