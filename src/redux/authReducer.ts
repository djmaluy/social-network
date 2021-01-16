import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
export const SET_USER_DATA = "SET-USER-DATA";
export const GET_CAPTCHA_URL = "GET-CAPTCHA-URL";


let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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

/* Action creators & types */

type SetAuthUserDataPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL
  payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL,
  payload: { captchaUrl },
});

/* thunk creator */
export const getUserData = () => async (dispatch: any) => {
    const meData =  await authAPI.getUserData();
      if (meData.resultCode === 0) {
        let { id, email, login } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
      }
    };
  

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (
  dispatch: any
) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);

  if (loginData.resultCode === 0) {
    dispatch(getUserData());
  } else {
    if (loginData.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
    loginData.messages.length > 0 ? loginData.messages[0] : "some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const res = await securityAPI.getCaptcha();
  const captchaUrl = res.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => {
  return (dispatch: any) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    });
  };
};
export default authReducer;
