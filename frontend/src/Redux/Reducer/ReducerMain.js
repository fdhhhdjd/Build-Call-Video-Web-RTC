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
    case types.DASHBOARD_SET_GROUP_CALL_ROOMS_START:
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
    //todo: Group
    case types.DASHBOARD_SET_GROUP_CALL_ROOMS_SUCCESS:
      return {
        ...state,
        loading: false,
        groupCallRooms: action.payload,
      };
    case types.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
      };
    case types.DASHBOARD_SET_USERNAME_FAIL:
    case types.DASHBOARD_SET_ACTIVE_USERS_FAIL:
    case types.DASHBOARD_SET_GROUP_CALL_ROOMS_FAIL:
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
