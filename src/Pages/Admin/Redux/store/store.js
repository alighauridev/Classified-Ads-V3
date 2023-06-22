import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";
import RootReducer from "../reducers/index";

const userInfoFromLC = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  UserLogin: {
    userInfo: userInfoFromLC,
  },
};
const Store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(Thunk))
);

export default Store;
