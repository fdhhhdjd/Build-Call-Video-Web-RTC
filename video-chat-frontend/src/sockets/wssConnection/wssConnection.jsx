//* LIB
import socketClient from "socket.io-client";

const SERVER = process.env.SERVER_SOCKET;
let socket;

export const connectWithWebSocket = () => {
  socket = socketClient(SERVER);

  socket.on("connection", () => {
    console.log("Successfully connected with wss server ✅");
    console.log(socket.id);
  });
  socket.on("error", (error) => {
    console.error("WebSocket connection error:", error);
  });
};

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};
