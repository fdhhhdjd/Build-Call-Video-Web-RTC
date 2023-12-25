//** LIB
import { createSlice } from "@reduxjs/toolkit";

//* Create initial State of data
const initialState = {
  username: "",
  activeUsers: [],
  groupCallRooms: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setActiveUsers: (state, action) => {
      console.log(action);
      state.activeUsers = action.payload;
    },
  },
});
// Todo: 1. Reducer
const authReducer = authSlice.reducer;

// Todo: 2. Action
const authAction = authSlice.actions;

// Todo: 3 Export action
export const { setUsername, setActiveUsers, setGroupCalls } = authAction;

export default authReducer;
