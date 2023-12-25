//* LIB
const { v4: uuidv4 } = require("uuid");

//* IMPORT
const broadcastEventTypes = require("../constants");

let peers = [];
let groupCallRooms = [];

global.io.on("connection", (socket) => {
  socket.emit("connection", null);
  console.log("new user connected");
  console.log(socket.id);

  socket.on("register-new-user", (data) => {
    peers.push({
      username: data.username,
      socketId: data.socketId,
    });
    console.log("registered new user");
    console.log(peers);

    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    peers = peers.filter((peer) => peer.socketId !== socket.id);
    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.ACTIVE_USERS,
      activeUsers: peers,
    });

    groupCallRooms = groupCallRooms.filter(
      (room) => room.socketId !== socket.id
    );
    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  // listeners related with direct call
  socket.on("pre-offer", (data) => {
    console.log("pre-offer handled");
    global.io.to(data.callee.socketId).emit("pre-offer", {
      callerUsername: data.caller.username,
      callerSocketId: socket.id,
    });
  });

  socket.on("pre-offer-answer", (data) => {
    console.log("handling pre offer answer");
    global.io.to(data.callerSocketId).emit("pre-offer-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-offer", (data) => {
    console.log("handling webRTC offer");
    global.io.to(data.calleeSocketId).emit("webRTC-offer", {
      offer: data.offer,
    });
  });

  socket.on("webRTC-answer", (data) => {
    console.log("handling webRTC answer");
    global.io.to(data.callerSocketId).emit("webRTC-answer", {
      answer: data.answer,
    });
  });

  socket.on("webRTC-candidate", (data) => {
    console.log("handling ice candidate");
    global.io.to(data.connectedUserSocketId).emit("webRTC-candidate", {
      candidate: data.candidate,
    });
  });

  socket.on("user-hanged-up", (data) => {
    global.io.to(data.connectedUserSocketId).emit("user-hanged-up");
  });

  // listeners related with group call
  socket.on("group-call-register", (data) => {
    const roomId = uuidv4();
    socket.join(roomId);

    const newGroupCallRoom = {
      peerId: data.peerId,
      hostName: data.username,
      socketId: socket.id,
      roomId: roomId,
    };

    groupCallRooms.push(newGroupCallRoom);
    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });

  socket.on("group-call-join-request", (data) => {
    global.io.to(data.roomId).emit("group-call-join-request", {
      peerId: data.peerId,
      streamId: data.streamId,
    });

    socket.join(data.roomId);
  });

  socket.on("group-call-user-left", (data) => {
    socket.leave(data.roomId);

    global.io.to(data.roomId).emit("group-call-user-left", {
      streamId: data.streamId,
    });
  });

  socket.on("group-call-closed-by-host", (data) => {
    groupCallRooms = groupCallRooms.filter(
      (room) => room.peerId !== data.peerId
    );

    global.io.sockets.emit("broadcast", {
      event: broadcastEventTypes.GROUP_CALL_ROOMS,
      groupCallRooms,
    });
  });
});
