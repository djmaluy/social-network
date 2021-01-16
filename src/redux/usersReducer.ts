
import { UsersType } from './../../social-network/src/types/types';
import { usersAPI } from "../api/api";
import { updateObjInArray } from "../utils/objectHelpers";

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


const usersReducer = (state = initialState, action: any): InitialStateType => {
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


export const getUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount / pageSize));
  };
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    let res = await usersAPI.follow(userId);

    if (res.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
  };
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    let res = await usersAPI.unfollow(userId);

    if (res.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
  };
};

export default usersReducer;
