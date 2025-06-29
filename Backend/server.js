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

const allowedOrigins = [
  "http://localhost:5173",
  "https://chat-application-frontend-117v.onrender.com"
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
