import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import ChatGroup from "../models/chatGroupModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected with database!");
  });

const chatGroupData = JSON.parse(
  fs.readFileSync(`${__dirname}/chats.json`, "utf-8")
);

const importData = async () => {
  try {
    await ChatGroup.create(chatGroupData);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await ChatGroup.deleteMany();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
