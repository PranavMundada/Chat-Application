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

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://chat-application-frontend-117v.onrender.com",
  process.env.FRONTEND_URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow specific pre-configured origins, or ANY local dev origin across ANY port.
      if (
        !origin || 
        allowedOrigins.includes(origin) || 
        (origin && origin.startsWith("http://localhost:")) ||
        (origin && origin.startsWith("http://127.0.0.1:"))
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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


app.all("/{*any}", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
