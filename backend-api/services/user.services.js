const User = require("../schemas/user");

const addGoogleUser = ({ email, firstName, lastName, profilePhoto }) => {
  const user = new User({
    email,
    firstName,
    lastName,
    profilePhoto,
  });
  return user.save();
};

const getUsers = () => {
  return User.find({});
};

const getUserById = async ({ id }) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};
const getUserByEmail = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};

const updateUser = async (payload, userId) => {
  try {
    const { description, profilePhoto, firstName, lastName } = payload;
    const user = await User.updateOne(
      { _id: userId },
      { $set: { description, profilePhoto, firstName, lastName } }
    );
    if (!user) throw new Error("User was not updated");
    return user;
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};
module.exports = {
  addGoogleUser,
  getUserByEmail,
  getUserById,
  getUsers,
  updateUser,
};
