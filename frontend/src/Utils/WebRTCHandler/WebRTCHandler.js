import {
  resetCallDataStateInitiate,
  setCallerUsernameInitiate,
  setCallingDialogVisibleInitiate,
  setCallRejectedInitiate,
  setCallStateInitiate,
  setLocalStreamInitiate,
  setRemoteStreamInitiate,
  setScreenSharingActiveInitiate,
} from "../../Redux/Action/ActionCall";
import {
  preOfferAnswers,
  defaultConstrains,
  configuration,
  callStates,
} from "../ShareData";
import store from "../../Redux/Store";
import * as wss from "../Connect-Soket/wssConnection";

let connectedUserSocketId;
let peerConnection;
let dataChannel;

//Get Camera
export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      store.dispatch(setLocalStreamInitiate(stream));
      store.dispatch(setCallStateInitiate({ call: callStates.CALL_AVAILABLE }));
      createPeerConnection();
    })
    .catch((err) => {
      console.log(
        "error occured when trying to get an access to get local stream"
      );
      console.log(err);
    });
};
//create peer connect
const createPeerConnection = () => {
  peerConnection = new RTCPeerConnection(configuration);

  const localStream = store.getState().call.localStream;

  for (const track of localStream.getTracks()) {
    peerConnection.addTrack(track, localStream);
  }
  peerConnection.ontrack = ({ streams: [stream] }) => {
    store.dispatch(setRemoteStreamInitiate(stream));
  };

  // incoming data channel messages
  peerConnection.ondatachannel = (event) => {
    const dataChannel = event.channel;

    dataChannel.onopen = () => {
      console.log("peer connection is ready to receive data channel messages");
    };

    // dataChannel.onmessage = (event) => {
    //   store.dispatch(setMessage(true, event.data));
    // };
  };

  dataChannel = peerConnection.createDataChannel("chat");

  dataChannel.onopen = () => {
    console.log("chat data channel succesfully opened");
  };

  peerConnection.onicecandidate = (event) => {
    console.log("geeting candidates from stun server");
    if (event.candidate) {
      wss.sendWebRTCCandidate({
        candidate: event.candidate,
        connectedUserSocketId: connectedUserSocketId,
      });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection.connectionState === "connected") {
      console.log("succesfully connected with other peer");
    }
  };
};
//Call
export const handlePreOffer = (data) => {
  if (checkIfCallIsPossible()) {
    connectedUserSocketId = data.callerSocketId;
    store.dispatch(setCallerUsernameInitiate(data.callerUsername));
    store.dispatch(setCallStateInitiate({ call: callStates.CALL_REQUESTED }));
  } else {
    wss.sendPreOfferAnswer({
      callerSocketId: data.callerSocketId,
      answer: preOfferAnswers.CALL_NOT_AVAILABLE,
    });
  }
};
//accept call
export const acceptIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_ACCEPTED,
  });

  store.dispatch(setCallStateInitiate({ call: callStates.CALL_IN_PROGRESS }));
};
//reject call
export const rejectIncomingCallRequest = () => {
  wss.sendPreOfferAnswer({
    callerSocketId: connectedUserSocketId,
    answer: preOfferAnswers.CALL_REJECTED,
  });
  resetCallData();
};
//call

export const handlePreOfferAnswer = (data) => {
  store.dispatch(setCallingDialogVisibleInitiate({ data: false }));

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
      setCallRejectedInitiate({
        rejected: true,
        reason: rejectionReason,
      })
    );

    resetCallData();
  }
};
const sendOffer = async () => {
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  wss.sendWebRTCOffer({
    calleeSocketId: connectedUserSocketId,
    offer: offer,
  });
};
export const callToOtherUser = (calleeDetails) => {
  connectedUserSocketId = calleeDetails.socketId;
  store.dispatch(setCallStateInitiate({ call: callStates.CALL_IN_PROGRESS }));
  store.dispatch(setCallingDialogVisibleInitiate({ data: true }));

  wss.sendPreOffer({
    callee: calleeDetails,
    caller: {
      username: store.getState().user.username,
    },
  });
};

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
//Function Reject
export const resetCallData = () => {
  connectedUserSocketId = null;
  store.dispatch(setCallStateInitiate({ call: callStates.CALL_AVAILABLE }));
};
//show dialog
export const hangUp = () => {
  wss.sendUserHangedUp({
    connectedUserSocketId: connectedUserSocketId,
  });
  console.log("hangup----");
  resetCallDataAfterHangUp();
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
      "error occured when trying to add received ice candidate",
      err
    );
  }
};
export const handleOffer = async (data) => {
  await peerConnection.setRemoteDescription(data.offer);
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  wss.sendWebRTCAnswer({
    callerSocketId: connectedUserSocketId,
    answer: answer,
  });
};
export const handleAnswer = async (data) => {
  await peerConnection.setRemoteDescription(data.answer);
};
let screenSharingStream;
export const switchForScreenSharingStream = async () => {
  if (!store.getState().call.screenSharingActive) {
    try {
      screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      store.dispatch(setScreenSharingActiveInitiate({ active: true }));
      const senders = peerConnection.getSenders();
      const sender = senders.find(
        (sender) =>
          sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
      );
      sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
    } catch (err) {
      console.error(
        "error occured when trying to get screen sharing stream",
        err
      );
    }
  } else {
    const localStream = store.getState().call.localStream;
    const senders = peerConnection.getSenders();
    const sender = senders.find(
      (sender) => sender.track.kind === localStream.getVideoTracks()[0].kind
    );
    sender.replaceTrack(localStream.getVideoTracks()[0]);
    store.dispatch(setScreenSharingActiveInitiate({ active: false }));

    screenSharingStream.getTracks().forEach((track) => track.stop());
  }
};

const resetCallDataAfterHangUp = () => {
  peerConnection.close();
  peerConnection = null;
  createPeerConnection();
  resetCallData();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;

  if (store.getState().call.screenSharingActive) {
    screenSharingStream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  store.dispatch(resetCallDataStateInitiate());
};
