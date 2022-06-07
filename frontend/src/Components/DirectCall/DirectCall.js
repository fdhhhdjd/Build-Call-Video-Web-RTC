import React from "react";
import { useSelector } from "react-redux";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import { callStates } from "../../Utils/ShareData";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import CallingDialog from "../CallingDialog/CallingDialog";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import ConversationButtons from "../ConversationButtons/ConversationButtons";
import CallRejectedDialog from "../CallRejectedDialog/CallRejectedDialog";
const DirectCall = () => {
  const {
    localStream,
    callerUsername,
    callState,
    callingDialogVisible,
    remoteStream,
    callRejected,
  } = useSelector((state) => state.call);
  return (
    <React.Fragment>
      <LocalVideoView localStream={localStream} />

      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <RemoteVideoView remoteStream={remoteStream} />
      )}
      {callRejected.rejected && (
        <CallRejectedDialog reason={callRejected.reason} />
      )}
      <LocalVideoView localStream={localStream} />
      {callState === callStates.CALL_REQUESTED && (
        <IncomingCallDialog callerUsername={callerUsername} />
      )}

      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <ConversationButtons />
      )}
    </React.Fragment>
  );
};

export default DirectCall;
