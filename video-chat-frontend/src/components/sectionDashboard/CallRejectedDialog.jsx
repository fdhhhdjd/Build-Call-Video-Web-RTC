//* LIB
import React from "react";
import { useDispatch } from "react-redux";

//* IMPORT
import { setCallRejected } from "../../providers/redux/call/slice";
import { _4_SECOND } from "../../common/constants";
import useSelectorCall from "../../hooks/useSelectorCall";

const CallRejectedDialog = () => {
  const { callRejected } = useSelectorCall();
  const dispatch = useDispatch();
  const timer = React.useRef();

  React.useEffect(() => {
    timer.current = setTimeout(() => {
      dispatch(
        setCallRejected({
          rejected: false,
          reason: "",
        })
      );
    }, [_4_SECOND]);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="call_rejected_dialog background_secondary_color">
      <span>{callRejected.reason}</span>
    </div>
  );
};

export default CallRejectedDialog;
