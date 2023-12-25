//* IMPORT
import {
  callStates,
  configuration,
  defaultConstrains,
  preOfferAnswers,
} from "../../common/constants";
import {
  setCallState,
  setCallerUsername,
  setCallingDialogVisible,
  setLocalStream,
} from "../../providers/redux/call/slice";
import { store } from "../../providers/redux/store";
import {
  sendPreOffer,
  sendPreOfferAnswer,
} from "../wssConnection/wssConnection";

let connectedUserSocketId;
let peerConnection;
let dataChannel;

// Todo: 1. Take stream for google chrome
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

// Todo: 2. Started call user
export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
  store.dispatch(setCallingDialogVisible(true));

  sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store?.getState()?.auth?.username,
    },
  });
};

// Todo: 3. Get offer from user call
export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
  } else {
    sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};

// Todo: 4. Check call is possible
export const checkIfCallIsPossible = () => {
  if (
    store.getState().call.localStream === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE
  ) {
    return false;
  } else {
    return true;
  }
};

// Todo: Connect peer
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("Connected with other peer success ✅");
    }
  };
};
