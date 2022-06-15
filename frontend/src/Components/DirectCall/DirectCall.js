import React from "react";
import { useSelector } from "react-redux";
import LocalVideoView from "../LocalVideoView/LocalVideoView";
import { callStates } from "../../Utils/ShareData";
import IncomingCallDialog from "../IncomingCallDialog/IncomingCallDialog";
import CallingDialog from "../CallingDialog/CallingDialog";
import RemoteVideoView from "../RemoteVideoView/RemoteVideoView";
import ConversationButtons from "../ConversationButtons/ConversationButtons";
import { CallRejectedDialog, Messenger } from "../../Imports/Index";
const DirectCall = () => {
  const {
    localStream,
    callerUsername,
    callState,
    callingDialogVisible,
    remoteStream,
    callRejected,
    message,
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
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && (
        <Messenger message={message} />
      )}
    </React.Fragment>
  );
};

export default DirectCall;
