const userCollection = require("../models/usersSchema");
const bcrypt = require("bcrypt");

// get all user  /users
const getUsers = async (req, res, next) => {
  try {
    const users = await userCollection.find();
    res.send({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// create a new user  /users
const createUser = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new userCollection({
      ...req.body,
      password: hashPassword,
      image: `http://localhost:3000/images/${req.file.filename}`,
    });
    await user.save();
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// update user  users/:id
const updateUser = async (req, res, next) => {
  try {
    const user = await userCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      success: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// get user  users/:id
const getUser = async (req, res, next) => {
  try {
    const user = await userCollection.findById(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
// //////////////////////////////////////////////////////////////////

// delete user   users/:id
const deleteUser = async (req, res, next) => {
  const user = await userCollection.findByIdAndDelete(req.params.id);
  res.json({ success: true, data: user });
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { createUser, updateUser, getUser, getUsers, deleteUser };
