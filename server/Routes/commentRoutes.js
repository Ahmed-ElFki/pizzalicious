const express = require("express");
const { authSuper } = require("../controllers/authorize");
const {
  registerComment,
  deleteComment,
  getAllComments,
  getProductComments,
  updateComment,
} = require("../controllers/commentControllers");

const commentRoutes = express.Router();

commentRoutes.post("/register", registerComment);

commentRoutes.post("/all", getAllComments);

commentRoutes.post("/:id", getProductComments);

commentRoutes.delete("/delete/:id", deleteComment);

commentRoutes.patch("/update/:id", updateComment);

module.exports = commentRoutes;
