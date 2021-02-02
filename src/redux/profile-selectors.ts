import { AppStateType } from './redux-store';

// Селектор - это ф-я, которая принимает целиком State и возвращает какую-то часть
export const getPostData = (state: AppStateType) => {
  return state.profilePage.postData
}
export const getNewPostText = (state: AppStateType) => {
  return state.profilePage.newPostText
}
export const getProfile = (state: AppStateType) => {
  return state.profilePage.profile
}
export const getStatus = (state: AppStateType) => {
  return state.profilePage.status
}


