import React, { useState } from "react";
import {
  MdCallEnd,
  MdMic,
  MdMicOff,
  MdVideocam,
  MdVideocamOff,
  MdVideoLabel,
  MdCamera,
} from "react-icons/md";
import ConversationButton from "./ConversationButton";
import {
  switchForScreenSharingStream,
  hangUp,
} from "../../Utils/WebRTCHandler/WebRTCHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  setCameraEnabledInitiate,
  setMicrophoneEnabledInitiate,
} from "../../Redux/Action/ActionCall";

const styles = {
  buttonContainer: {
    display: "flex",
    position: "absolute",
    bottom: "22%",
    left: "35%",
  },
  icon: {
    width: "25px",
    height: "25px",
    fill: "#e6e5e8",
  },
};

const ConversationButtons = () => {
  const {
    localStream,
    screenSharingActive,
    localMicrophoneEnabled,
    localCameraEnabled,
    groupCallActive,
  } = useSelector((state) => state.call);
  console.log(groupCallActive, " groupCallActive ");
  const dispatch = useDispatch();
  const handleMicButtonPressed = () => {
    const micEnabled = localMicrophoneEnabled;
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    dispatch(setMicrophoneEnabledInitiate({ flag: !micEnabled }));
  };

  const handleCameraButtonPressed = () => {
    const cameraEnabled = localCameraEnabled;
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    dispatch(
      setCameraEnabledInitiate({
        flag: !cameraEnabled,
      })
    );
  };

  const handleScreenSharingButtonPressed = () => {
    switchForScreenSharingStream();
  };

  const handleHangUpButtonPressed = () => {
    hangUp();
  };

  return (
    <div style={styles.buttonContainer}>
      <ConversationButton onClickHandler={handleMicButtonPressed}>
        {localMicrophoneEnabled ? (
          <MdMic style={styles.icon} />
        ) : (
          <MdMicOff style={styles.icon} />
        )}
      </ConversationButton>
      {!groupCallActive && (
        <ConversationButton onClickHandler={handleHangUpButtonPressed}>
          <MdCallEnd style={styles.icon} />
        </ConversationButton>
      )}

      <ConversationButton onClickHandler={handleCameraButtonPressed}>
        {localCameraEnabled ? (
          <MdVideocam style={styles.icon} />
        ) : (
          <MdVideocamOff style={styles.icon} />
        )}
      </ConversationButton>
      {!groupCallActive && (
        <ConversationButton onClickHandler={handleScreenSharingButtonPressed}>
          {screenSharingActive ? (
            <MdCamera style={styles.icon} />
          ) : (
            <MdVideoLabel style={styles.icon} />
          )}
        </ConversationButton>
      )}
    </div>
  );
};

export default ConversationButtons;
