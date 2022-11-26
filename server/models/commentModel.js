const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});

module.exports = mongoose.model("commentModel", commentSchema);
