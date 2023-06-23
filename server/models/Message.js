const { Schema } = require("mongoose");

const MessageSchema = new Schema(
  {
    message: {
      type: Array,
    },
    senderMail: {
      type: String,
    },
    receiverMail: {
      type: String,
    },
  },
  {
    timestamps: Number,
  }
);

const Message = model("Message", MessageSchema);

module.exports = Message;
