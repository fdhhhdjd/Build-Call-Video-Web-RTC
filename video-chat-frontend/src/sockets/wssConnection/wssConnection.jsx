//* LIB
import socketClient from "socket.io-client";

//* IMPORT
import { store } from "../../providers/redux/store";
import { setActiveUsers } from "../../providers/redux/auth/slice";
import { broadcastEventTypes } from "../../common/constants";
import {
  handleAnswer,
  handleCandidate,
  handleOffer,
  handlePreOffer,
  handlePreOfferAnswer,
  handleUserHangedUp,
} from "../webRTC/webRTCHandler";

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

  socket.on("pre-offer", (data) => {
    handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    handlePreOfferAnswer(data);
  });

  socket.on("user-hanged-up", () => {
    handleUserHangedUp();
  });

  socket.on("webRTC-candidate", (data) => {
    handleCandidate(data);
  });

  socket.on("webRTC-answer", (data) => {
    handleAnswer(data);
  });

  socket.on("webRTC-offer", (data) => {
    handleOffer(data);
  });
};

export const registerNewUser = (username) => {
  socket.emit("register-new-user", {
    username: username,
    socketId: socket.id,
  });
};

// Todo: Send info user then started call
export const sendPreOffer = (data) => {
  socket.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socket.emit("pre-offer-answer", data);
};

export const sendUserHangedUp = (data) => {
  socket.emit("user-hanged-up", data);
};

export const sendWebRTCOffer = (data) => {
  socket.emit("webRTC-offer", data);
};

export const sendWebRTCCandidate = (data) => {
  socket.emit("webRTC-candidate", data);
};
export const sendWebRTCAnswer = (data) => {
  socket.emit("webRTC-answer", data);
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
