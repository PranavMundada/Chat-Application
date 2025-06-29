import catchAsync from "../utils/catchAsync.js";
import Message from "./../models/messageModel.js";

export const getMessagesOfChat = catchAsync(async (req, res, next) => {
  const messages = await Message.find({ chatGroup: req.params.chatId });

  res.status(200).json({
    status: "success",
    results: messages.length,
    data: {
      messages,
    },
  });
});

export const createMessagesOfChat = catchAsync(async (req, res, next) => {
  const message = await Message.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
});
