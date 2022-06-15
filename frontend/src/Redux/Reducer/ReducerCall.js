import * as types from "../ActionTypes";
import { callStates } from "../../Utils/ShareData";
const initialState = {
  loading: false,
  error: null,
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
const CallReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CALL_SET_LOCAL_STREAM_START:
    case types.CALL_SET_CALL_STATE_START:
    case types.CALL_SET_CALLER_USERNAME_START:
    case types.CALL_SET_CALLING_DIALOG_VISIBLE_START:
    case types.CALL_RESET_CALL_STATE_START:
    case types.CALL_SET_CALL_REJECTED_START:
    case types.CALL_SET_REMOTE_STREAM_START:
    case types.CALL_SET_LOCAL_CAMERA_ENABLED_START:
    case types.CALL_SET_LOCAL_MICROPHONE_ENABLED_START:
    case types.CALL_SET_SCREEN_SHARING_ACTIVE_START:
    case types.CALL_SET_GROUP_CALL_STREAMS_START:
    case types.CALL_SET_GROUP_CALL_ACTIVE_START:
    case types.CALL_CLEAR_GROUP_CALL_DATA_START:
    case types.CALL_SET_CHAT_MESSAGE_START:
      return {
        ...state,
        loading: true,
      };
    case types.CALL_SET_LOCAL_STREAM_SUCCESS:
      return {
        ...state,
        loading: false,
        localStream: action.payload,
      };
    case types.CALL_SET_CALL_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        callState: action.payload,
      };
    case types.CALL_SET_CALLER_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        callerUsername: action.payload,
      };

    case types.CALL_SET_CALLING_DIALOG_VISIBLE_SUCCESS:
      return {
        ...state,
        loading: false,
        callingDialogVisible: action.payload,
      };
    case types.CALL_SET_CALL_REJECTED_SUCCESS:
      return {
        ...state,
        loading: false,
        callRejected: action.payload,
      };
    case types.CALL_SET_REMOTE_STREAM_SUCCESS:
      return {
        ...state,
        loading: false,
        remoteStream: action.payload,
      };
    case types.CALL_SET_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    //todo:Group

    case types.CALL_SET_GROUP_CALL_STREAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        groupCallStreams: action.payload,
      };

    case types.CALL_SET_GROUP_CALL_ACTIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        groupCallActive: action.payload,
      };
    case types.CALL_CLEAR_GROUP_CALL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        groupCallActive: false,
        groupCallStreams: [],
        callState: callStates.CALL_AVAILABLE,
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
      };

    //Todo: Share
    case types.CALL_SET_LOCAL_CAMERA_ENABLED_SUCCESS:
      return {
        ...state,
        loading: false,
        localCameraEnabled: action.payload,
      };
    case types.CALL_SET_LOCAL_MICROPHONE_ENABLED_SUCCESS:
      return {
        ...state,
        loading: false,
        localMicrophoneEnabled: action.payload,
      };
    case types.CALL_SET_SCREEN_SHARING_ACTIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        screenSharingActive: action.payload,
      };
    case types.CALL_RESET_CALL_STATE_SUCCESS:
      return {
        ...state,
        remoteStream: null,
        screenSharingActive: false,
        callerUsername: "",
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
        callingDialogVisible: false,
      };
    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
      };
    case types.CALL_SET_LOCAL_STREAM_FAIL:
    case types.CALL_SET_CALL_STATE_FAIL:
    case types.CALL_SET_CALLER_USERNAME_FAIL:
    case types.CALL_SET_CALLING_DIALOG_VISIBLE_FAIL:
    case types.CALL_RESET_CALL_STATE_FAIL:
    case types.CALL_SET_CALL_REJECTED_FAIL:
    case types.CALL_SET_REMOTE_STREAM_FAIL:
    case types.CALL_SET_LOCAL_CAMERA_ENABLED_FAIL:
    case types.CALL_SET_LOCAL_MICROPHONE_ENABLED_FAIL:
    case types.CALL_SET_SCREEN_SHARING_ACTIVE_FAIL:
    case types.CALL_SET_GROUP_CALL_STREAMS_FAIL:
    case types.CALL_SET_GROUP_CALL_ACTIVE_FAIL:
    case types.CALL_CLEAR_GROUP_CALL_DATA_FAIL:
    case types.CALL_SET_CHAT_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default CallReducer;
