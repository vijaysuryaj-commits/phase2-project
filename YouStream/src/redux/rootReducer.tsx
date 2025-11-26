import { combineReducers } from "redux";
import videoReducer from "./videos/videoReducer";
import filterReducer from "./filters/filterReducer";

const rootReducer =  combineReducers({
    videoState:videoReducer,
    filterState:filterReducer
})
export default rootReducer
export type RootState = ReturnType<typeof rootReducer>