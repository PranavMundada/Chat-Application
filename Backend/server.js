import { createServer } from "http";

import app from "./app.js";
import { socketio } from "./socket.js";

import { Server } from "socket.io";
import { mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

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

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketio(io);

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated. Server closed.");
  });
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Process interrupted. Server closed.");
  });
});

const port = process.env.PORT;
server.listen(port, () => {
  console.log("server running on port " + port);
});
