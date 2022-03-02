const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please add an email address"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please add a password"]
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("User", UserSchema);