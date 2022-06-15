import { useSelector } from "react-redux";
import { callStates } from "../../Utils/ShareData";
import * as webRTCGroupCallHandler from "../../Utils/WebRTCHandler/webRTCGroupCallHandler";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";

const GroupCall = () => {
  const { callState, localStream, groupCallActive } = useSelector(
    (state) => state.call
  );
  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };
  return (
    <>
      {!groupCallActive &&
        localStream &&
        callState !== callStates.CALL_IN_PROGRESS && (
          <GroupCallButton onClickHandler={createRoom} label="Create room" />
        )}
      {groupCallActive && <GroupCallRoom />}
      {groupCallActive && (
        <GroupCallButton onClickHandler={leaveRoom} label="Leave room" />
      )}
    </>
  );
};

export default GroupCall;
