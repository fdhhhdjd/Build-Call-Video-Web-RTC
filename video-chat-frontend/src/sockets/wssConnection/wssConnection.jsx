//* LIB
import socketClient from "socket.io-client";

//* IMPORT
import { store } from "../../providers/redux/store";
import { setActiveUsers } from "../../providers/redux/auth/slice";
import { broadcastEventTypes } from "../../common/constants";

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

  socket.on("broadcast", (data) => {
    handleBroadcastEvents(data);
  });
};

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

const handleBroadcastEvents = (data) => {
  switch (data.event) {
    case broadcastEventTypes.ACTIVE_USERS:
      const activeUsers = data.activeUsers.filter(
        (activeUser) => activeUser.socketId !== socket.id
      );
      store.dispatch(setActiveUsers(activeUsers));
      break;
    default:
      break;
  }
};
