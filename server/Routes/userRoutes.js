const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUser,
  getUserData,
} = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/all", getUsers);

userRoutes.post("/:id", getUserData);

userRoutes.delete("/delete/:id", deleteUser);

userRoutes.patch("/update/:id", updateUser);

module.exports = userRoutes;
