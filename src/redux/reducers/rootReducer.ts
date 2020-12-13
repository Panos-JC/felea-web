import { combineReducers } from "redux";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
