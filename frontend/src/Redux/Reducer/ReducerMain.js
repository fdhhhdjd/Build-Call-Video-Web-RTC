import * as types from "../ActionTypes";
const initialState = {
  loading: false,
  error: null,
  username: "",
  activeUsers: [],
  groupCallRooms: [],
};
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_SET_USERNAME_START:
    case types.DASHBOARD_SET_ACTIVE_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case types.DASHBOARD_SET_USERNAME_SUCCESS:
      return {
        ...state,
        loading: false,
        username: action.payload,
      };
    case types.DASHBOARD_SET_ACTIVE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeUsers: action.payload,
      };
    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
      };
    case types.DASHBOARD_SET_USERNAME_FAIL:
    case types.DASHBOARD_SET_ACTIVE_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default MainReducer;
