import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoute.js";
import { AppError } from "./utils/appError.js";
import globalErrorHandler from "./controller/errorController.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`
, // must be explicit, NOT '*'
    credentials: true, // allow cookies to be sent
  })
);
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("");
});

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);
app.get("/api/auth/verify", (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

app.get("/api/auth/me", (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

app.all("/{*any}", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
