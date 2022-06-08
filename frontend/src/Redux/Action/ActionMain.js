import * as types from "../ActionTypes";
//?Set User Name
export const setUsernameStart = () => ({
  type: types.DASHBOARD_SET_USERNAME_START,
});
export const setUsernameSuccess = (apis) => ({
  type: types.DASHBOARD_SET_USERNAME_SUCCESS,
  payload: apis,
});
export const setUsernameFail = (error) => ({
  type: types.DASHBOARD_SET_USERNAME_FAIL,
  payload: error,
});
//?Set Active User
export const setActiveUserStart = () => ({
  type: types.DASHBOARD_SET_ACTIVE_USERS_START,
});
export const setActiveUserSuccess = (apis) => ({
  type: types.DASHBOARD_SET_ACTIVE_USERS_SUCCESS,
  payload: apis,
});
export const setActiveUserFail = (error) => ({
  type: types.DASHBOARD_SET_ACTIVE_USERS_FAIL,
  payload: error,
});
//?Set Group User
export const setGroupCallRoomStart = () => ({
  type: types.DASHBOARD_SET_GROUP_CALL_ROOMS_START,
});

export const setGroupCallRoomSuccess = (apis) => ({
  type: types.DASHBOARD_SET_GROUP_CALL_ROOMS_SUCCESS,
  payload: apis,
});
export const setGroupCallRoomFail = (error) => ({
  type: types.DASHBOARD_SET_GROUP_CALL_ROOMS_FAIL,
  payload: error,
});
//! Set User Name
export const setUsernameInitiate = (username) => async (dispatch) => {
  try {
    dispatch(setUsernameStart());

    dispatch(setUsernameSuccess(username));
  } catch (error) {
    dispatch(setUsernameFail(error));
  }
};
//! Set active UserName
export const setActiveUserInitiate = (activeUsers) => async (dispatch) => {
  try {
    dispatch(setActiveUserStart());

    dispatch(setActiveUserSuccess(activeUsers));
  } catch (error) {
    dispatch(setActiveUserFail(error));
  }
};
//! Go home Group Call Room
export const setGroupCallRoomInitiate =
  (groupCallRooms) => async (dispatch) => {
    try {
      dispatch(setGroupCallRoomStart());

      dispatch(setGroupCallRoomSuccess(groupCallRooms));
    } catch (error) {
      dispatch(setGroupCallRoomFail(error));
    }
  };

//!CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS_SUCCESS });
};
