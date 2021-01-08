import { PostDataType, ProfileType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const UPDATE_STATUS = "UPDATE_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";


let initialState = {
  postData: [
    { id: 1, text: "hi" },
    { id: 2, text: "hi-hi" },
    { id: 3, text: "yo" },
  ] as Array<PostDataType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: ''
};
export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):initialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        text: action.newPostText,
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
        newPostText: "",
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

/* Action creators */
type addPostActionType = {
  type: typeof ADD_POST
  newPostText:string
}
export const addPost = (newPostText:string): addPostActionType => ({
  type: ADD_POST,
  newPostText,
});
type setUsersProfileActionType = {
  type: typeof SET_USERS_PROFILE
  profile: ProfileType
}
export const setUsersProfile = (profile: ProfileType):setUsersProfileActionType => ({
  type: SET_USERS_PROFILE,
  profile,
});
type setStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status:string): setStatusActionType => ({
  type: SET_STATUS,
  status,
});
type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType):savePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

/* thunk creators */
export const getProfile = (userId:number) => async (dispatch:any) => {
  const res = await usersAPI.getProfile(userId);
  dispatch(setUsersProfile(res.data));
};

export const getStatus = (userId:number) => async (dispatch:any) => {
  const res = await profileAPI.getStatus(userId);
  dispatch(setStatus(res.data));
};
export const updateStatus = (status:string) => async (dispatch:any) => {
  const res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file:any) => async (dispatch:any) => {
  const res = await profileAPI.savePhoto(file);
  if (res.data.resultCode === 0) {
    dispatch(savePhotoSuccess(res.data.data.photos));
  }
}; 

export const saveProfile = (profile: ProfileType) => async (dispatch:any, getState:any) => {
  const userId = getState().auth.userId;
  const res = await profileAPI.saveProfile(profile);
  if (res.data.resultCode === 0) {
    dispatch(getProfile(userId));
  } else {
    dispatch(stopSubmit("editProfileData", { _error: res.data.messages[0] }));
    return Promise.reject(res.data.messages[0]);
  }
};

export default profileReducer;
