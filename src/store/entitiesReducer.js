import { combineReducers } from "redux";
import logsReducer from "./logs";
import techsReducer from "./techs";

export default combineReducers({
  logs: logsReducer,
  techs: techsReducer,
});
