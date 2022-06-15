import * as wss from "../Connect-Soket/wssConnection";
import store from "../../Redux/Store";
import {
  clearGroupCallDataInitiate,
  setCallStateInitiate,
  setGroupCallActiveInitiate,
  setGroupCallIncomingStreamsInitiate,
} from "../../Redux/Action/ActionCall";
import { callStates } from "../ShareData";
let myPeer;
let myPeerId;
let groupCallRoomId;
let groupCallHost = false;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "5001",
  });
  myPeer.on("open", (id) => {
    console.log("succesfully connected with peer server");
    myPeerId = id;
  });
  myPeer.on("call", (call) => {
    call.answer(store.getState().call.localStream);
    call.on("stream", (incomingStream) => {
      const streams = store.getState().call.groupCallStreams;
      const stream = streams.find((stream) => stream.id === incomingStream.id);
      if (!stream) {
        addVideoStream(incomingStream);
      }
    });
  });
};

export const createNewGroupCall = () => {
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().user.username,
    peerId: myPeerId,
  });
  store.dispatch(setGroupCallActiveInitiate({ call: true }));
  store.dispatch(
    setCallStateInitiate({
      call: callStates.CALL_IN_PROGRESS,
    })
  );
};

export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId;
  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id,
  });
  store.dispatch(setGroupCallActiveInitiate({ call: true }));
  store.dispatch(setCallStateInitiate({ call: callStates.CALL_IN_PROGRESS }));
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;
  const call = myPeer.call(data.peerId, localStream);
  call.on("stream", (incomingStream) => {
    const streams = store.getState().call.groupCallStreams;
    const stream = streams.find((stream) => stream.id === incomingStream.id);
    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};

export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallClosedByHost({
      peerId: myPeerId,
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId,
    });
  }
  clearGroupData();
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  groupCallHost = null;
  store.dispatch(clearGroupCallDataInitiate());
  myPeer.destroy();
  connectWithMyPeer();
  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};

export const removeInactiveStream = (data) => {
  const groupCallStreams = store
    .getState()
    .call.groupCallStreams.filter((stream) => stream.id !== data.streamId);
  store.dispatch(setGroupCallIncomingStreamsInitiate(groupCallStreams));
};

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream,
  ];
  store.dispatch(setGroupCallIncomingStreamsInitiate(groupCallStreams));
};

// if group call is active return roomId if not return false
export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};
