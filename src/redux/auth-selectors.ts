import { AppStateType } from './redux-store';

// Селектор - это ф-я, которая принимает целиком State и возвращает какую-то часть

export const getAuthorizedUserId = (state: AppStateType) => {
  return state.auth.userId
}
export const getIsAuth = (state: AppStateType) => {
  return state.auth.isAuth
}
export const getLogin = (state: AppStateType) => {
  return state.auth.login
}