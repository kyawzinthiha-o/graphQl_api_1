const mongoose = require("mongoose");

const User_Schema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Users", User_Schema);
