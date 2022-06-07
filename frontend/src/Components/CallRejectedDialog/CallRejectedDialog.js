import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCallRejectedInitiate } from "../../Redux/Action/ActionCall";

import "../../Styles/CallRejectedDialog.css";

const CallRejectedDialog = ({ reason }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setCallRejectedInitiate({
          rejected: false,
          reason: "",
        })
      );
    }, [4000]);
  }, []);

  return (
    <div className="call_rejected_dialog background_secondary_color">
      <span>{reason}</span>
    </div>
  );
};

export default CallRejectedDialog;
