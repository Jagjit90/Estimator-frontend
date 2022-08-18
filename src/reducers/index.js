
import userProjectReducer from "./userdata";
import allModulesReducer from "./allmodules";
import customModulesReducer from "./custommodules";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userProject: userProjectReducer,
  moduleData: allModulesReducer,
  custommod:customModulesReducer,
  
});
export default rootReducer;