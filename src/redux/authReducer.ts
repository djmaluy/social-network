import { ResultCodeForCaptcha, ResultCodesEnum } from './../api/api';
import { AppStateType } from './../../social-network/src/redux/redux-store';
import { Dispatch } from "react";
import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";
import { ThunkAction } from 'redux-thunk';
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

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

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
type DispatchTypes = Dispatch<ActionsTypes>
type ThunkTypes = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserData = (): ThunkTypes => async (dispatch: DispatchTypes) => {
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

  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getUserData());
  } else {
    if (loginData.resultCode === ResultCodeForCaptcha.CaptchIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message =
    loginData.messages.length > 0 ? loginData.messages[0] : "some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = (): ThunkTypes => async (dispatch: DispatchTypes) => {
  const captchaData = await securityAPI.getCaptcha();
  const captchaUrl = captchaData.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkTypes => async(dispatch: DispatchTypes) => {
    const logoutData = await authAPI.logout()
      if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false));
      }
    }
  

export default authReducer;
