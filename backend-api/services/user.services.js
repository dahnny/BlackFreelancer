const User = require("../schemas/user");

const login = async (request) => {
  const { username, firstName, lastName, profilePhoto, password } =
    request.body;
  const currentUser = await User.findOne({ username });
  if (!currentUser) {
    const user = new User({
      username,
      firstName,
      lastName,
      profilePhoto,
    });
    await User.register(user, password);
    return request;
  }
  const user = new User({
    username,
    password,
  });
  request.login(user, (err) => {
    if (err) throw new Error(err);
    return user;
  });
};

const get = () => {
  return User.find({});
};

const getById = async ({ id }) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};
const getByEmail = async ({ email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.log({ error });
    throw new Error(error.message);
  }
};

const update = async (payload, userId) => {
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
  login,
  getByEmail,
  getById,
  get,
  update,
};
