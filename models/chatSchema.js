const mongoose = require('mongoose');

const { Schema } = mongoose;
const chatSchema = new Schema(
  {
    message: {
      type: Array,
    },
    sender: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
