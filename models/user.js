const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

module.exports = User;
