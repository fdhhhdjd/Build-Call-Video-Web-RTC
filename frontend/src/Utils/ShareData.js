export const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

//Web Rtc
export const preOfferAnswers = {
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
};

//Video
export const defaultConstrains = {
  video: {
    width: 480,
    height: 360,
  },
  audio: true,
};
//Configuration
export const configuration = {
  iceServers: [
    {
      urls: process.env.REACT_APP_KEY_URL_GOOGLE,
    },
  ],
};
//Call state
export const callStates = {
  CALL_UNAVAILABLE: "CALL_UNAVAILABLE",
  CALL_AVAILABLE: "CALL_AVAILABLE",
  CALL_REQUESTED: "CALL_REQUESTED",
  CALL_IN_PROGRESS: "CALL_IN_PROGRESS",
};
