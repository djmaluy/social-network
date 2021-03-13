import { UsersType } from './../types/types';
import { InferActionsTypes, AppStateType } from './redux-store';
import { ResultCodesEnum } from "../api/api";
import {  usersAPI } from "../api/users-api";
import { updateObjInArray } from "../utils/objectHelpers";
import { ThunkAction } from 'redux-thunk';


let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 16,
  currentPage: 1,
  isFetching: false,
  totalUsersCount: 0, 
  followingStart: [],
  filter: {
    term: '',
    friend: null as null | boolean
  }
};
export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState


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
    case 'TOGGLE_FOLLOWING': { 
      return {
        ...state,
        //@ts-ignore
        followingStart: action.isFetching
         ? [...state.followingStart, action.userId]
         : [state.followingStart.filter(id => id !== action.userId)]
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
    case 'SET_FILTER': {
      return{
        ...state, 
        filter: action.payload
      }
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
  setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter } as const),
  toggleFollowingStart: (isFetching: boolean, userId: number) => ({type:'TOGGLE_FOLLOWING', isFetching, userId } as const)
}

// type GetStateType = () => AppStateType
type ActionTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType  => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));
    const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount / pageSize));
  };
};
export const follow = (userId: number): ThunkType => async (dispatch) => {
  
  dispatch(actions.toggleFollowingStart(true, userId))
    const followData = await usersAPI.follow(userId);
    if (followData.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.followSuccess(userId));
      dispatch(actions.toggleFollowingStart(false, userId))
    }
  };
export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  
    dispatch(actions.toggleFollowingStart(true, userId))
    const unfollowData = await usersAPI.unfollow(userId);
    if (unfollowData.resultCode === ResultCodesEnum.Success) {
      //@ts-ignore
    dispatch(actions.unfollowSuccess(userId, userId));
    dispatch(actions.toggleFollowingStart(false, userId))
    }
  };

export default usersReducer;
