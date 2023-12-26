//* LIB
import React from "react";

//* IMPORT
import { callStates } from "../../common/constants";
import useContextCall from "../../hooks/useContextCall";
import useSelectorCall from "../../hooks/useSelectorCall";
import CallRejectedDialog from "./CallRejectedDialog";
import CallingDialog from "./CallingDialog";
import IncomingCallDialog from "./IncomingCallDialog";
import LocalVideoView from "./LocalVideoView";

const DirectCall = () => {
  const { callingDialogVisible, callState, callRejected } = useSelectorCall();
  const { stopSound, playSound, handlePickUp, clearTimePickUp } =
    useContextCall();

  React.useEffect(() => {
    if (callingDialogVisible) {
      handlePickUp();
      playSound();
    } else {
      stopSound();
    }
    return () => {
      clearTimePickUp();
    };
  }, [callState]);
  return (
    <React.Fragment>
      {/* 1. Video */}
      <LocalVideoView />

      {/* 2. Show pop info for people call caller reject  */}
      {callRejected.rejected && <CallRejectedDialog />}

      {/* 3. Pop up call video call */}
      {callingDialogVisible && <CallingDialog />}

      {/* 4. Pop up call video caller */}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog />}
    </React.Fragment>
  );
};

export default DirectCall;
