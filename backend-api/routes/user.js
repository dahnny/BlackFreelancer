const express = require("express");
const upload = require("../helpers/multer");
const app = express.Router();
const authenticate = require("../middlewares/authenticator");

const {
  get,
  getById,
  update,
  uploadImage,
} = require("../services/user.services");

// find all users
app.get("/", async (req, res, next) => {
  try {
    const data = await get();
    return res.status(200).json({ message: "Retrieved Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

// find user by id
app.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getById({ id });
    return res
      .status(200)
      .json({ message: "Retrieved Successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

app.post("/upload/image", upload.single("photo"), async (req, res) => {
  try {
    const photo = req.file.path;
    return res
      .status(200)
      .json({ message: "Uploaded Image Successfully", data: {photo} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

// edit user
app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await update(req.body, id);
    return res
      .status(200)
      .json({ message: "Updated User Successfully", data: req.user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

module.exports = app;
