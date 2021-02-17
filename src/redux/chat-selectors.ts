import { AppStateType } from './redux-store';

// Селектор - это ф-я, которая принимает целиком State и возвращает какую-то часть

export const getChatMessages = (state: AppStateType) => {
  return state.chat.messages
}
export const getChatStatus = (state: AppStateType) => {
  return state.chat.status
}
