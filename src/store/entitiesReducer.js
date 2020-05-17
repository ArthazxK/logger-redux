import { combineReducers } from "redux";
import logsReducer from "./logs";

export default combineReducers({
  logs: logsReducer,
});
