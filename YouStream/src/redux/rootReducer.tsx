import { combineReducers } from "redux";
import videoReducer from "./videos/videoReducer";
import filterReducer from "./filters/filterReducer";
import authReducer from "./auth/authReducer";

const rootReducer =  combineReducers({
    videoState:videoReducer,
    filterState:filterReducer,
    auth:authReducer
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>