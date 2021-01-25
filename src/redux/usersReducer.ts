import { AppStateType } from './../../social-network/src/redux/redux-store';

import { UsersType } from './../../social-network/src/types/types';
import { usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/objectHelpers";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'react';

export const FOLLOW = "FOLLOW";
export const UNFOLLOW = "UNFOLLOW";
export const SET_USERS = "SET_USERS";
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
export const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";


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
    case FOLLOW: {
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    default:
      return state;
  }
};

type ActionTypes = FollowSuccessActionType | UnfollowSuccessActionType | 
                    SetUsersActionType | ToggleIsFetchingActionType |
                    SetTotalUsersCountActionType | SetCurrentPageActionType

/* Action creators & types */
type FollowSuccessActionType = {
  type: typeof FOLLOW
  userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({
  type: FOLLOW,
  userId,
});
type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
  type: UNFOLLOW,
  userId,
});
type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array<UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({

  type: SET_USERS,
  users
});

type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalUsersCount,
});
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});



// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType  => {
  return async (dispatch: DispatchType) => {
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount / pageSize));
  };
};

export const follow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    const res = await usersAPI.follow(userId);

    if (res.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
  };

export const unfollow = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    const res = await usersAPI.unfollow(userId);

    if (res.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
  };


export default usersReducer;
