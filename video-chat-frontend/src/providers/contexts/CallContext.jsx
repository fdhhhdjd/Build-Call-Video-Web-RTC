//* LIB
import React from "react";

//* IMPORT
import MusicMessageIncome from "../../assets/message.mp3";
import { _10_SECOND } from "../../common/constants";
import { rejectIncomingCallNotPickupRequest } from "../../sockets/webRTC/webRTCHandler";

export const CallContext = React.createContext(null);

const CallProvider = ({ children }) => {
  const audioRef = React.useRef(null);
  const timerCall = React.useRef(null);

  const playSound = () => {
    const audio = new Audio(MusicMessageIncome);
    audio.play();
    audioRef.current = audio;
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleNotPickUp = () => {
    timerCall.current = setTimeout(() => {
      rejectIncomingCallNotPickupRequest();
    }, _10_SECOND);
  };

  const clearTimePickUp = () => {
    clearTimeout(timerCall.current);
    stopSound();
  };

  const data = { playSound, stopSound, handleNotPickUp, clearTimePickUp };

  CallContext.displayName = "Call Context";

  return <CallContext.Provider value={data}>{children}</CallContext.Provider>;
};

export default CallProvider;
