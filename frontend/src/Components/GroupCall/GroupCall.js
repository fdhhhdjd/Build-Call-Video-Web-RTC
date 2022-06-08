import React from "react";
import { useSelector } from "react-redux";
import { callStates } from "../../Utils/ShareData";
import GroupCallButton from "../GroupCallButton/GroupCallButton";
import GroupCallRoom from "../GroupCallRoom/GroupCallRoom";
import * as webRTCGroupCallHandler from "../../Utils/WebRTCHandler/webRTCGroupCallHandler";

const GroupCall = () => {
  const { callState, localStream, groupCallActive, groupCallStreams } =
    useSelector((state) => state.call);

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    // webRTCGroupCallHandler.leaveGroupCall();
  };
  console.log(groupCallActive, "groupCallActive");
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
