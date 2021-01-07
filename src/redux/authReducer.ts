import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
export const SET_USER_DATA = "SET-USER-DATA";
export const GET_CAPTCHA_URL = "GET-CAPTCHA-URL";

export type initialStateType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
  captchaUrl: string | null
}

let initialState:initialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any):initialStateType => {
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

type setAuthUserDataActionPayloadType = {
  userId:number | null
  email:string | null
  login:string | null
  isAuth:boolean
}

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId:number | null, email:string | null, login:string | null, isAuth:boolean):setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL
  payload: { captchaUrl: string},
}

export const getCaptchaUrlSuccess = (captchaUrl:string):getCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL,
  payload: { captchaUrl },
});

/* thunk creator */
export const getUserData = () => {
  return async (dispatch:any) => {
    return authAPI.getUserData().then((res) => {
      if (res.data.resultCode === 0) {
        let { id, email, login } = res.data.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    });
  };
};
export const login = (email:string, password:string, rememberMe:boolean, captcha:string) => async (
  dispatch:any
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

export const getCaptchaUrl = () => async (dispatch:any) => {
  const res = await securityAPI.getCaptcha();
  const captchaUrl = res.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => {
  return (dispatch:any) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};
export default authReducer;
