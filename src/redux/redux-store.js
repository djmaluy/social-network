import { createStore, combineReducers } from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});

const store = createStore(reducers);

window.store = store;

export default store;
