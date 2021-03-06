import { createStore, combineReducers, applyMiddleware, compose, Action } from "redux"
import profileReducer from "./profileReducer"
import dialogsReducer from "./dialogsReducer"
import usersReducer from "./usersReducer"
import authReducer from "./authReducer"
import thunkMiddlware, { ThunkAction } from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./appReducer"
import chatReducer from "./chat-reducer"

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType> // export our all State of whole App

// type PropertiesType<T> = T extends {[ key: string]: infer U } ? U : never   ---> https://habr.com/ru/company/alfa/blog/452620/
export type InferActionsTypes<T> = T extends {[ keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType< A extends Action, R = Promise<void >> = ThunkAction<R, AppStateType, unknown, A >

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddlware))
);
//@ts-ignore
window.store = store

export default store
