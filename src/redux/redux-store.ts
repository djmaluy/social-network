import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddlware from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer"

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddlware))
);
//@ts-ignore
window.store = store

export default store
