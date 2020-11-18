import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USERS_PROFILE = "SET_USERS_PROFILE";
const SET_STATUS = "SET_STATUS";
const UPDATE_STATUS = "UPDATE_STATUS";

let initialState = {
  postData: [
    { id: 1, text: "hi" },
    { id: 2, text: "hi-hi" },
    { id: 3, text: "yo" },
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

/* Action creators */

export const addPost = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export const setUsersProfile = (profile) => ({
  type: SET_USERS_PROFILE,
  profile,
});
export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

/* thunk creators */
export const getProfile = (userId) => async (dispatch) => {
  let res = await usersAPI.getProfile(userId);
  dispatch(setUsersProfile(res.data));
};

export const getStatus = (userId) => async (dispatch) => {
  let res = await profileAPI.getStatus(userId);
  dispatch(setStatus(res.data));
};
export const updateStatus = (status) => async (dispatch) => {
  let res = await profileAPI.updateStatus(status);
  if (res.data.resultCode === 0) dispatch(setStatus(status));
};

export default profileReducer;
