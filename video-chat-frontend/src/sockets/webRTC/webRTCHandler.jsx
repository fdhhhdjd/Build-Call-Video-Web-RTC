//* IMPORT
import {
  callStates,
  configuration,
  defaultConstrains,
} from "../../common/constants";
import { setCallState, setLocalStream } from "../../providers/redux/call/slice";
import { store } from "../../providers/redux/store";

let connectedUserSocketId;
let peerConnection;
let dataChannel;

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      store.dispatch(setCallState(callStates.CALL_AVAILABLE));
      createPeerConnection();
    })
    .catch((err) => {
      console.log(
        "error occurred when trying to get an access to get local stream"
      );
      console.log(err);
    });
};

const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("Connected with other peer success ✅");
    }
  };
};
