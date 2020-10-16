import { combineReducers, compose, createStore } from "redux";
import userReducer from "./reducers/userReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

const reducers = combineReducers({
  user: userReducer,
});

const store = createStore(reducers, initialState, composeEnhancers());

export default store;
