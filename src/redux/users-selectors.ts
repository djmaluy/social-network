import { AppStateType } from './redux-store';

// Селектор - это ф-я, которая принимает целиком State и возвращает какую-то его часть
export const getAllUsers = (state: AppStateType) => {
  return state.usersPage.users;
};
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
}; 
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getUsersFilter = (state: AppStateType) => {
  return state.usersPage.filter;
};
export const getFollowingStart = (state: AppStateType) => {
  return state.usersPage.followingStart
}