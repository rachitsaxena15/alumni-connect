import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import eventsReducer from "./reducers/eventsReducer";

const middlewares = [thunk];

const reducers = combineReducers({ eventsReducer });

const store = createStore(reducers, {}, applyMiddleware(...middlewares));

export default store;
