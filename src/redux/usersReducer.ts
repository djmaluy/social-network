import { InferActionsTypes } from './redux-store';
import { AppStateType } from './../../social-network/src/redux/redux-store';
import { UsersType } from './../../social-network/src/types/types';
import { ResultCodesEnum } from "../api/api";
import {  usersAPI } from "../api/users-api";
import { updateObjInArray } from "../utils/objectHelpers";
import { ThunkAction } from 'redux-thunk';

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 15,
  currentPage: 1,
  isFetching: false,
  totalUsersCount: 0, 
};

type InitialStateType = typeof initialState


const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW': {
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case 'UNFOLLOW': { 
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case 'SET_USERS': {
      return {
        ...state,
        users: action.users,
      };
    }
    case 'TOGGLE_IS_FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    default:
      return state;
  }
};



/* Action creators & types */
export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
  setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage } as const),
}

// type GetStateType = () => AppStateType
type ActionTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType  => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount / pageSize));
  };
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
    const followData = await usersAPI.follow(userId);

    if (followData.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.followSuccess(userId));
    }
  };
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    const unfollowData = await usersAPI.unfollow(userId);

    if (unfollowData.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.unfollowSuccess(userId));
    }
  };

export default usersReducer;
