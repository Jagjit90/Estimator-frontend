
import userProjectReducer from "./userdata";
import allModulesReducer from "./allmodules";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userProject: userProjectReducer,
  moduleData: allModulesReducer,
});
export default rootReducer;