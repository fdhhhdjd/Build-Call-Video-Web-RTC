//* LIB
import React from "react";

//* IMPORT
import useContextCall from "../../hooks/useContextCall";
import useSelectorCall from "../../hooks/useSelectorCall";
import { rejectIncomingCallRequest } from "../../sockets/webRTC/webRTCHandler";

const IncomingCallDialog = () => {
  const { callerUsername } = useSelectorCall();
  const { stopSound } = useContextCall();

  const handleAcceptButtonPressed = () => {};

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
    stopSound();
  };

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
