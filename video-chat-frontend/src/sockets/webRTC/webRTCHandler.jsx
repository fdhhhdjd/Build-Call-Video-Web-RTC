//* IMPORT
import {
  callStates,
  configuration,
  defaultConstrains,
  preOfferAnswers,
} from "../../common/constants";
import {
  resetCallDataState,
  setCallRejected,
  setCallState,
  setCallerUsername,
  setCallingDialogVisible,
  setLocalStream,
  setRemoteStream,
} from "../../providers/redux/call/slice";
import { store } from "../../providers/redux/store";
import {
  sendPreOffer,
  sendPreOfferAnswer,
  sendUserHangedUp,
  sendWebRTCAnswer,
  sendWebRTCCandidate,
  sendWebRTCOffer,
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

// Todo: 5. Reject a call of caller
export const rejectIncomingCallRequest = () => {
  sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });
  resetCallData();
};
// Todo: Caller not pick up phone
export const rejectIncomingCallNotPickupRequest = () => {
  sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_NOT_AVAILABLE,
  });
  resetCallData();
};

// Todo: 6. Reset call video
export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};

// Todo: 7. Access caller
export const acceptIncomingCallRequest = () => {
  sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });

  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer,
  });
};

export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer,
  });
};

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisible(false));

  if (data.answer === preOfferAnswers.CALL_ACCEPTED) {
    sendOffer();
  } else {
    let rejectionReason;

    if (data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
      rejectionReason = "Callee is not able to pick up the call right now";
    } else {
      rejectionReason = "Call rejected by the callee";
    }
    store.dispatch(
      setCallRejected({
        rejected: true,
        reason: rejectionReason,
      })
    );

    resetCallData();
  }
};

// Todo: 7. Destroy call video form call
export const hangUp = () => {
  sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
  });

  resetCallDataAfterHangUp();
};

const resetCallDataAfterHangUp = () => {
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;

  store.dispatch(resetCallDataState());
};

export const handleUserHangedUp = () => {
  resetCallDataAfterHangUp();
};

export const handleCandidate = async (data) => {
  try {
    console.log("adding ice candidates");
    await peerConnection.addIceCandidate(data.candidate);
  } catch (err) {
    console.error(
      "error occurred when trying to add received ice candidate",
      err
    );
  }
};

export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};

// Todo: Connect peer
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);

  // Get camera call and caller
  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }

  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStream(stream));
  };

  peerConnection.onicecandidate = (event) => {
    console.log("geeing candidates from stun server");
    if (event.candidate) {
      sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId,
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("Connected with other peer success ✅");
    }
  };
};
