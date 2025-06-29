import express from "express";
import {
  createChatGroup,
  getChatGroups,
  getChatGroup,
  updateChatGroup,
  deleteChatGroup,
} from "../controller/chatController.js";
import { protect } from "../controller/authController.js";

const chatRouter = express.Router();

chatRouter.route("/").get(protect, getChatGroups).post(createChatGroup);

chatRouter
  .route("/:chatId")
  .get(getChatGroup)
  .patch(updateChatGroup)
  .delete(deleteChatGroup);

export default chatRouter;
