const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  veg: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("productModel", productSchema);
