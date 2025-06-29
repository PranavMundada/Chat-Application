import express from "express";
import {
  createMessagesOfChat,
  getMessagesOfChat,
} from "../controller/messageController.js";

const messageRouter = express.Router();

messageRouter.route("/").post(createMessagesOfChat);

messageRouter.route("/:chatId").get(getMessagesOfChat);

export default messageRouter;
