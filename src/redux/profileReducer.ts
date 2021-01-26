import { AppStateType } from './../../social-network/src/redux/redux-store';

import { PhotosType, ProfileType } from './../../social-network/src/types/types';
import { stopSubmit } from "redux-form";
import { profileAPI, ResultCodesEnum } from "../api/api";
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const UPDATE_STATUS = "UPDATE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";



export type PostDataType = {
  id: number
  text: string
  likesCount: number
} 
let initialState = {
  postData: [
    { id: 1, text: "hi", likesCount: 14 },
    { id: 2, text: "hi-hi", likesCount: 10 },
    { id: 3, text: "yo", likesCount: 1 },
  ] as Array<PostDataType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ""

};
export type initialStateType = typeof initialState

export type  InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        text: action.newPostText,
        likesCount: 7
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: ""
        
      };
    }
    case SET_USERS_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case UPDATE_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};


/* Action creators & types */

type ActionsTypes = AddPostActionType | SetUserProfileActionCreator 
                  | SetStatusActionType | SavePhotoSuccessActionType
type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
});
type SetUserProfileActionCreator = {
  type: typeof SET_USERS_PROFILE
  profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType): SetUserProfileActionCreator => ({
  type: SET_USERS_PROFILE,
  profile,
});
type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});
type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

/* thunk creators */

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  const profileData = await profileAPI.getProfile(userId);
  dispatch(setUsersProfile(profileData));
};

export const getStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  const statusData = await profileAPI.getStatus(userId);
  dispatch(setStatus(statusData));
};
export const updateStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
  const updateStatusData = await profileAPI.updateStatus(status);
  if (updateStatusData.resultCode === ResultCodesEnum.Success) {
    dispatch(setStatus(status));
      }
};

export const savePhoto = (file: any): ThunkType => async (dispatch: DispatchType) => {
  const res = await profileAPI.savePhoto(file);
  if (res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos));
  }
}; 


export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const profileData= await profileAPI.saveProfile(profile);
  if (profileData.resultCode === ResultCodesEnum.Success) {
    dispatch(getProfile(userId));
  } else {
    dispatch(stopSubmit("editProfileData", { _error: profileData.messages[0] }));
    return Promise.reject(profileData.messages[0]);
  }
};

export default profileReducer;
