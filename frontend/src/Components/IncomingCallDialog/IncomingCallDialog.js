import React from "react";
import {
  acceptIncomingCallRequest,
  rejectIncomingCallRequest,
} from "../../Utils/WebRTCHandler/WebRTCHandler";
import "../../Styles/IncomingCallDialog.css";

const IncomingCallDialog = ({ callerUsername }) => {
  const handleAcceptButtonPressed = () => {
    acceptIncomingCallRequest();
  };

  const handleRejectButtonPressed = () => {
    rejectIncomingCallRequest();
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
export default IncomingCallDialog;
