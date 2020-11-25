import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
export const SET_USER_DATA = "SET-USER-DATA";
export const GET_CAPTCHA_URL = "GET-CAPTCHA-URL";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

/* Action creators */

export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL,
  payload: { captchaUrl },
});

/* thunk creator */
export const getUserData = () => {
  return async (dispatch) => {
    return authAPI.getUserData().then((res) => {
      if (res.data.resultCode === 0) {
        let { id, email, login } = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};
export const login = (email, password, rememberMe, captcha) => async (
  dispatch
) => {
  const res = await authAPI.login(email, password, rememberMe, captcha);

  if (res.data.resultCode === 0) {
    dispatch(getUserData());
  } else {
    if (res.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      res.data.messages.length > 0 ? res.data.messages[0] : "some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const res = await securityAPI.getCaptcha();
  const captchaUrl = res.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};
export default authReducer;
