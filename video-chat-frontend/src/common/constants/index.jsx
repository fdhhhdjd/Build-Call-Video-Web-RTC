const callStates = {
  CALL_UNAVAILABLE: "CALL_UNAVAILABLE",
  CALL_AVAILABLE: "CALL_AVAILABLE",
  CALL_REQUESTED: "CALL_REQUESTED",
  CALL_IN_PROGRESS: "CALL_IN_PROGRESS",
};

const preOfferAnswers = {
  CALL_ACCEPTED: "CALL_ACCEPTED",
  CALL_REJECTED: "CALL_REJECTED",
  CALL_NOT_AVAILABLE: "CALL_NOT_AVAILABLE",
};

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  GROUP_CALL_ROOMS: "GROUP_CALL_ROOMS",
};

const defaultConstrains = {
  video: {
    width: 480,
    height: 360,
  },
  audio: true,
};

const configuration = {
  iceServers: [
    {
      urls: process.env.SERVER_STUN,
    },
  ],
};

const imageDeFault =
  "https://robohash.org/620050a4db5104ba23238cd75171d63c2?gravatar=hashed";

const _4_SECOND = 4 * 1000;
const _10_SECOND = 10 * 1000;

export {
  callStates,
  preOfferAnswers,
  defaultConstrains,
  configuration,
  broadcastEventTypes,
  imageDeFault,
  _4_SECOND,
  _10_SECOND,
};
