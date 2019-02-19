import { combineReducers } from "redux";

import userReducer from "./userReducer";
import currentUserReducer from "./currentUserReducer";
import projectReducer from "./projectReducer";


const appReducer =  combineReducers({
    userReducer, currentUserReducer, projectReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
