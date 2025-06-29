import mongoose, { mongo } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A message must have a Sender"],
  },
  chatGroup: {
    type: mongoose.Schema.ObjectId,
    ref: "ChatGroup",
    required: [true, "A message must belong to group chat"],
  },
  message: {
    type: String,
    required: [true, "A message cannot be empty"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
