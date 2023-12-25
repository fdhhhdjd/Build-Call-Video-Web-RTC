//** LIB
import { createSlice } from "@reduxjs/toolkit";

//** IMPORT
import { callStates } from "../../../common/constants";

//* Create initial State of data
const initialState = {
  localStream: null,
  callState: callStates.CALL_UNAVAILABLE,
  callingDialogVisible: false,
  callerUsername: "",
  callRejected: {
    rejected: false,
    reason: "",
  },
  remoteStream: null,
  localCameraEnabled: true,
  localMicrophoneEnabled: true,
  screenSharingActive: false,
  groupCallActive: false,
  groupCallStreams: [],
  message: {
    received: false,
    content: "",
  },
};

const callSlice = createSlice({
  //* Name of action
  name: "call",
  //* Initial state
  initialState,
  //* Reducers react to action types created by the current 'slice.'
  //* Ex: total is included in the user slice, so we will add increment action to reducers
  reducers: {},
});
// Todo: 1. Reducer
const callReducer = callSlice.reducer;

// Todo: 2. Action
const callAction = callSlice.actions;

// Todo: 3 Export action
export const {} = callAction;

export default callReducer;
