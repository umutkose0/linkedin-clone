import rootReducer from "../reducers";
import { legacy_createStore as createStore,applyMiddleware } from 'redux';
import thunkMiddleware from "redux-thunk";

const store=createStore(rootReducer,applyMiddleware(thunkMiddleware));

export default store;