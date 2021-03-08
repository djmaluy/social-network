import { InferActionsTypes, BaseThunkType } from './redux-store';
import { PhotosType, ProfileType } from './../../social-network/src/types/types';
import { FormAction, stopSubmit } from "redux-form";
import {  ResultCodesEnum } from "../api/api";
import { profileAPI } from "../api/profile-api";

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

export type  InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
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
    case 'SET_USERS_PROFILE': {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case 'SET_STATUS': {
      return {
        ...state,
        status: action.status,
      };
    }
    case 'SAVE_PHOTO_SUCCESS': {
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
type ActionsTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
                 
export const actions = {
  addPost: (newPostText: string) => ({ type: 'ADD_POST', newPostText } as const),
  setUsersProfile: (profile: ProfileType) => ({ type: 'SET_USERS_PROFILE', profile } as const),
  setStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
  savePhotoSuccess: (photos: PhotosType) => ({ type: 'SAVE_PHOTO_SUCCESS', photos } as const),
}


/* thunk creators */
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUsersProfile(data));
};
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setStatus(status));
      }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
}; 

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data= await profileAPI.saveProfile(profile);
  if (data.resultCode === ResultCodesEnum.Success) {
    if(userId != null) {
      dispatch(getProfile(userId));
    } else {
      throw new Error("UserId can't be null")
    }
  } else {
    dispatch(stopSubmit("editProfileData", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
