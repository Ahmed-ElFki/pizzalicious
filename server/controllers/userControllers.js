const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");
const {
  JoiUserLoginValidation,
  JoiUserRegisterValidation,
} = require("../validators/userValidator");
const { avatarPIC } = require("./avatar");

const registerUser = async (req, res) => {
  const { error } = JoiUserRegisterValidation(req.body);
  if (!error) {
    const emailExists = await userModel.findOne({ email: req.body.email });
    if (emailExists) res.send({ message: "Check email/password" });
    else {
      const salt = await bcrypt.genSalt(10);
      const userHashedPassword = await bcrypt.hash(req.body.password, salt);
      const userObject = new userModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: userHashedPassword,
        avatar: avatarPIC,
        accountType: req.body.accountType,
      });
      const savedUser = await userObject.save();
      res.send({ userId: savedUser._id });
    }
  }
};

const loginUser = async (req, res) => {
  const { error } = JoiUserLoginValidation(req.body);
  if (!error) {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (!userExists) res.send({ message: "Check email/password" });
    else {
      const userPwd = userExists.password;
      const validatePwd = await bcrypt.compare(req.body.password, userPwd);

      if (!validatePwd) res.send({ message: "Check email/password" });
      else {
        const userType = userExists.accountType;
        const userToken = jwt.sign(
          { id: userExists._id },
          userType === "Moderator"
            ? process.env.SUPER_TOKEN
            : process.env.BASIC_TOKEN
        );
        res.header("auth-token", userToken).send({
          userToken: userToken,
          accountType: userExists.accountType,
          userId: userExists._id,
        });
      }
    }
  } else res.send({ message: "Email/Password wrong" });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await userModel.deleteOne({ _id: id });
    res.send({ message: `User with id ${id} deleted` });
  } catch (error) {
    res.send({ message: `User with id ${id} delete operation error` });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await userModel.find();
    res.send({ usersList });
  } catch (error) {
    res.send({ message: "usersList retrieve error" });
  }
};

const getUserData = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await userModel.findById(userID);
    res.send({ user });
  } catch (error) {
    res.send({ message: `can not find user id ${userID}` });
  }
};

const updateUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const userHashedPassword = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await userModel.updateOne(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      {
        fullName: req.body.fullName,
        email: req.body.email,
        gender: req.body.gender,
        password: userHashedPassword,
      }
    );
    res.send({ updatedUser });
  } catch (error) {
    res.send({ message: "Update error" });
  }
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.getUsers = getUsers;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
