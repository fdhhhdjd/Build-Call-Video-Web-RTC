import { combineReducers } from "redux";
import MainReducer from "./Reducer/ReducerMain";
import CallReducer from "../Redux/Reducer/ReducerCall";
const rootReducer = combineReducers({
  user: MainReducer,
  call: CallReducer,
});

export default rootReducer;
