const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  accountType: {
    type: String,
    default: "Member",
  },
  subscriptionDate: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});

module.exports = mongoose.model("userModel", userSchema);
