import * as types from "../ActionTypes";
//?CALL_SET_LOCAL_STREAM
export const setLocalStreamStart = () => ({
  type: types.CALL_SET_LOCAL_STREAM_START,
});
export const setLocalStreamSuccess = (apis) => ({
  type: types.CALL_SET_LOCAL_STREAM_SUCCESS,
  payload: apis,
});
export const setLocalStreamFail = (error) => ({
  type: types.CALL_SET_LOCAL_STREAM_FAIL,
  payload: error,
});
//?CALL_SET_CALL_STATE
export const setCallStateStart = () => ({
  type: types.CALL_SET_CALL_STATE_START,
});
export const setCallStateSuccess = (apis) => ({
  type: types.CALL_SET_CALL_STATE_SUCCESS,
  payload: apis,
});
export const setCallStateFail = (error) => ({
  type: types.CALL_SET_CALL_STATE_FAIL,
  payload: error,
});
//?CALL_SET_USERName_USER CUSTOMER
export const setCallerUsernameStart = () => ({
  type: types.CALL_SET_CALLER_USERNAME_START,
});
export const setCallerUsernameSuccess = (apis) => ({
  type: types.CALL_SET_CALLER_USERNAME_SUCCESS,
  payload: apis,
});
export const setCallerUsernameFail = (error) => ({
  type: types.CALL_SET_CALLER_USERNAME_FAIL,
  payload: error,
});
//?CALL_SET_CALLING_DIALOG_VISIBLE
export const setCallingDialogVisibleStart = () => ({
  type: types.CALL_SET_CALLING_DIALOG_VISIBLE_START,
});
export const setCallingDialogVisibleSuccess = (apis) => ({
  type: types.CALL_SET_CALLING_DIALOG_VISIBLE_SUCCESS,
  payload: apis,
});
export const setCallingDialogVisibleFail = (error) => ({
  type: types.CALL_SET_CALLING_DIALOG_VISIBLE_FAIL,
  payload: error,
});
//?CALL_RESET_CALL_STATE (tat dien thoai reset)
export const resetCallDataStateStart = () => ({
  type: types.CALL_RESET_CALL_STATE_START,
});
export const resetCallDataStateSuccess = (apis) => ({
  type: types.CALL_RESET_CALL_STATE_SUCCESS,
  payload: apis,
});
export const resetCallDataStateFail = (error) => ({
  type: types.CALL_RESET_CALL_STATE_FAIL,
  payload: error,
});
//?CALL_set reject(tat dien thoai reset)
export const setCallRejectedStart = () => ({
  type: types.CALL_SET_CALL_REJECTED_START,
});
export const setCallRejectedSuccess = (apis) => ({
  type: types.CALL_SET_CALL_REJECTED_SUCCESS,
  payload: apis,
});
export const setCallRejectedFail = (error) => ({
  type: types.CALL_SET_CALL_REJECTED_FAIL,
  payload: error,
});
//?CALL_SET_REMOTE_STREAM
export const setRemoteStreamStart = () => ({
  type: types.CALL_SET_REMOTE_STREAM_START,
});
export const setRemoteStreamSuccess = (apis) => ({
  type: types.CALL_SET_REMOTE_STREAM_SUCCESS,
  payload: apis,
});
export const setRemoteStreamFail = (error) => ({
  type: types.CALL_SET_REMOTE_STREAM_FAIL,
  payload: error,
});
//?CALL_SET_SCREEN_SHARING_ACTIVE
export const setScreenSharingActiveStart = () => ({
  type: types.CALL_SET_SCREEN_SHARING_ACTIVE_START,
});
export const setScreenSharingActiveSuccess = (apis) => ({
  type: types.CALL_SET_SCREEN_SHARING_ACTIVE_SUCCESS,
  payload: apis,
});
export const setScreenSharingActiveFail = (error) => ({
  type: types.CALL_SET_SCREEN_SHARING_ACTIVE_FAIL,
  payload: error,
});
//?CALL_SET_LOCAL_CAMERA_ENABLED_SUCCESS
export const setCameraEnabledStart = () => ({
  type: types.CALL_SET_LOCAL_CAMERA_ENABLED_START,
});
export const setCameraEnabledSuccess = (apis) => ({
  type: types.CALL_SET_LOCAL_CAMERA_ENABLED_SUCCESS,
  payload: apis,
});
export const setCameraEnabledFail = (error) => ({
  type: types.CALL_SET_LOCAL_CAMERA_ENABLED_FAIL,
  payload: error,
});
//?CALL_SET_LOCAL_MICROPHONE_ENABLED_SUCCESS
export const setMicrophoneEnabledStart = () => ({
  type: types.CALL_SET_LOCAL_MICROPHONE_ENABLED_START,
});
export const setMicrophoneEnabledSuccess = (apis) => ({
  type: types.CALL_SET_LOCAL_MICROPHONE_ENABLED_SUCCESS,
  payload: apis,
});
export const setMicrophoneEnabledFail = (error) => ({
  type: types.CALL_SET_LOCAL_MICROPHONE_ENABLED_FAIL,
  payload: error,
});
//! Set local Stream
export const setLocalStreamInitiate = (stream) => async (dispatch) => {
  try {
    dispatch(setLocalStreamStart());

    dispatch(setLocalStreamSuccess(stream));
  } catch (error) {
    dispatch(setLocalStreamFail(error));
  }
};
//!Set Call State
export const setCallStateInitiate =
  ({ call }) =>
  async (dispatch) => {
    try {
      dispatch(setCallStateStart());

      dispatch(setCallStateSuccess(call));
    } catch (error) {
      dispatch(setCallStateFail(error));
    }
  };
//!Set Call USER STATE
export const setCallerUsernameInitiate = (stream) => async (dispatch) => {
  try {
    dispatch(setCallerUsernameStart());

    dispatch(setCallerUsernameSuccess(stream));
  } catch (error) {
    dispatch(setCallerUsernameFail(error));
  }
};
//!Show Dialog call
export const setCallingDialogVisibleInitiate =
  ({ data }) =>
  async (dispatch) => {
    try {
      dispatch(setCallingDialogVisibleStart());

      dispatch(setCallingDialogVisibleSuccess(data));
    } catch (error) {
      dispatch(setCallingDialogVisibleFail(error));
    }
  };
//!reset call false dialog
export const resetCallDataStateInitiate = () => async (dispatch) => {
  try {
    dispatch(resetCallDataStateStart());

    dispatch(resetCallDataStateSuccess());
  } catch (error) {
    dispatch(resetCallDataStateFail(error));
  }
};
//!Off call
export const setCallRejectedInitiate =
  ({ rejected, reason }) =>
  async (dispatch) => {
    try {
      dispatch(setCallRejectedStart());

      dispatch(setCallRejectedSuccess({ rejected, reason }));
    } catch (error) {
      dispatch(setCallRejectedFail(error));
    }
  };
//!video
export const setRemoteStreamInitiate = (remoteStream) => async (dispatch) => {
  console.log(remoteStream, "----take-----");
  try {
    dispatch(setRemoteStreamStart());

    dispatch(setRemoteStreamSuccess(remoteStream));
  } catch (error) {
    dispatch(setRemoteStreamFail(error));
  }
};
//!Share
export const setScreenSharingActiveInitiate =
  ({ active }) =>
  async (dispatch) => {
    try {
      dispatch(setScreenSharingActiveStart());

      dispatch(setScreenSharingActiveSuccess(active));
    } catch (error) {
      dispatch(setScreenSharingActiveFail(error));
    }
  };
//!On/Off camera
export const setCameraEnabledInitiate =
  ({ flag }) =>
  async (dispatch) => {
    try {
      dispatch(setCameraEnabledStart());

      dispatch(setCameraEnabledSuccess(flag));
    } catch (error) {
      dispatch(setCameraEnabledFail(error));
    }
  };
//!On/Off Mid
export const setMicrophoneEnabledInitiate =
  ({ flag }) =>
  async (dispatch) => {
    try {
      dispatch(setMicrophoneEnabledStart());

      dispatch(setMicrophoneEnabledSuccess(flag));
    } catch (error) {
      dispatch(setMicrophoneEnabledFail(error));
    }
  };

//!CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS_SUCCESS });
};
