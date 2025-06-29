import ChatGroup from "../models/chatGroupModel.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/APIFeatures.js";
import User from "../models/userModel.js";

export const getChatGroups = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    ChatGroup.find().populate("users"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const chatGroups = await features.query;

  res.status(200).json({
    status: "success",
    results: chatGroups.length,
    data: {
      chatGroups: chatGroups,
    },
  });
});

const updateUser = async (userId, chatId) => {
  const user = await User.findByIdAndUpdate(userId, {
    $addToSet: { chatGroups: chatId },
  });
};

export const createChatGroup = catchAsync(async (req, res, next) => {
  const newChatGroup = await ChatGroup.create(req.body);

  await Promise.all(
    newChatGroup.users.map((el) => {
      updateUser(el, newChatGroup._id);
    })
  );

  res.status(201).json({
    status: "success",
    data: {
      newChatGroup,
    },
  });
});

export const getChatGroup = catchAsync(async (req, res, next) => {
  const chatGroup = await ChatGroup.findById(req.params.chatId);

  if (!chatGroup) {
    return next(new AppError("Cannot find Chat Group with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      chatGroup,
    },
  });
});

export const updateChatGroup = catchAsync(async (req, res, next) => {
  const chatgroup = await ChatGroup.findByIdAndUpdate(
    req.params.chatId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!chatgroup) {
    return next(new AppError("Cannot find Chat Group with that id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      chatgroup,
    },
  });
});

export const deleteChatGroup = catchAsync(async (req, res, next) => {
  const chatgroup = await ChatGroup.findByIdAndDelete(req.params.chatId);

  if (!chatgroup) {
    return next(new AppError("Cannot find Chat Group with that id", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
