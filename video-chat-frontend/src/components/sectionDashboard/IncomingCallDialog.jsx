//* LIB
import React from "react";

//* IMPORT
import useSelectorCall from "../../hooks/useSelectorCall";
import {
  acceptIncomingCallRequest,
  rejectIncomingCallRequest,
} from "../../sockets/webRTC/webRTCHandler";
import useContextCall from "../../hooks/useContextCall";
import { callStates } from "../../common/constants";

const IncomingCallDialog = () => {
  const { callerUsername, callState } = useSelectorCall();
  const { handleNotPickUp, clearTimePickUp } = useContextCall();

  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
    clearTimePickUp();
  };

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  React.useEffect(() => {
    if (callState == callStates.CALL_REQUESTED) {
      handleNotPickUp();
    }
  }, [callState]);

  return (
    <div className="direct_call_dialog background_secondary_color">
      <span className="direct_call_dialog_caller_name">{callerUsername}</span>
      <div className="direct_call_dialog_button_container">
        <button
          className="direct_call_dialog_accept_button"
          onClick={handleAcceptButtonPressed}
        >
          Accept
        </button>
        <button
          className="direct_call_dialog_reject_button"
          onClick={handleRejectButtonPressed}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default IncomingCallDialog;
