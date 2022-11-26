const commentModel = require("../models/commentModel");
const { JoiCommentValidation } = require("../validators/commentValidator");

const registerComment = async (req, res) => {
  const { error } = JoiCommentValidation(req.body);
  if (!error) {
    const commentObject = new commentModel(req.body);
    const savedComment = await commentObject.save();
    res.send({ comment: savedComment._id });
  } else res.send({ message: "Comment registration error" });
};

const deleteComment = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedComment = await commentModel.deleteOne({ _id: id });
    res.send({ message: `Comment with id ${id} deleted` });
  } catch (error) {
    res.send({ message: `Comment with id ${id} delete error` });
  }
};

const getAllComments = async (req, res) => {
  try {
    const commentsList = await commentModel.find();
    res.send({ commentsList });
  } catch (error) {
    res.send({ message: "Comments retrieve error" });
  }
};

const getProductComments = async (req, res) => {
  const productID = req.params.id;
  try {
    const productComments = await commentModel.find({
      productId: productID,
    });
    res.send({ productComments });
  } catch (error) {
    res.send({ message: `can not find product comments with id ${productID}` });
  }
};

const updateComment = async (req, res) => {
  const commentID = req.params.id;
  try {
    const updatedComment = commentModel.updateOne({ _id: commentID }, req.body);
    res.send({ message: `Comment with id ${id} updated` });
  } catch (error) {
    res.send({ message: `Comment with id ${id} update error` });
  }
};

module.exports.registerComment = registerComment;
module.exports.deleteComment = deleteComment;
module.exports.getAllComments = getAllComments;
module.exports.getProductComments = getProductComments;
module.exports.updateComment = updateComment;
