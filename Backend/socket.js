import axios from "axios";

export function socketio(io) {
  io.on("connection", (socket) => {
    socket.join("general");
    socket.on("change room", (room) => {
      socket.join(room);
    });
    socket.on("room message", async (room, msg, userId) => {
      try {
        const msgResponse = await axios.post(
          `${VITE_API_URL}/api/messages`,
          {
            sender: userId,
            chatGroup: room,
            message: msg,
          }
        );
        io.to(room).emit("room message", room, msg, userId);
      } catch (err) {
        // console.log(err);
      }
    });
  });
}
