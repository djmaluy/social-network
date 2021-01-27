import { InferActionsTypes, BaseThunkType } from './redux-store';
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from './../api/api';
import { stopSubmit } from "redux-form";
import {  securityAPI } from './../api/security-api';
import {  authAPI } from './../api/auth-api';


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
    case 'SET_USER_DATA':
    case 'GET_CAPTCHA_URL': {
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
type ActionsTypes = InferActionsTypes<typeof actions>  // https://habr.com/ru/company/alfa/blog/452620/
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'SET_USER_DATA', payload: { userId, email, login, isAuth }} as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: 'GET_CAPTCHA_URL', payload: { captchaUrl } } as const)
}

/* thunk creator */
export const getUserData = (): ThunkType => async (dispatch) => {
    const meData =  await authAPI.getUserData();
      if (meData.resultCode === 0) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
      }
    };
  
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);

  if (loginData.resultCode === ResultCodesEnum.Success) {
    dispatch(getUserData());
  } else {
    if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const message =
    loginData.messages.length > 0 ? loginData.messages[0] : "some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const captchaData = await securityAPI.getCaptcha();
  const captchaUrl = captchaData.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async(dispatch) => {
    const logoutData = await authAPI.logout()
      if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
      }
    }
  

export default authReducer;
