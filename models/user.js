const mongoose = require("mongoose");
const userInformationSchema = new mongoose.Schema({
  username: String,
  password: String,
  isadmin: {
    type: Boolean,
    default: 0,
  },
});
const User = mongoose.model("User", userInformationSchema);
module.exports = User;
