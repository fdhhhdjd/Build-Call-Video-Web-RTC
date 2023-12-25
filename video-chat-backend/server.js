//* LIB

const express = require("express");
const socket = require("socket.io");
const { ExpressPeerServer } = require("peer");

//* IMPORT
require("dotenv").config();
const app = express();
const { createPeerServerListeners } = require("./src/utils/groupCallHandler");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`%s 🚀 Server is listening on port:http://localhost:${PORT}`)
);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);
createPeerServerListeners(peerServer);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

global.io = io;

require("./src/sockets/socketHandler");
