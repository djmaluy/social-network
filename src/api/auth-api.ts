import { instance, ResponseType, ResultCodesEnum, ResultCodeForCaptchaEnum } from './api';

type LoginResponseType = {
      UserId: number
  }

type GetUsersDataType = {
    id: number
    email: string
    login: string
  }

export const authAPI = {
  getUserData() {
    return instance.get<ResponseType<GetUsersDataType>>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<ResponseType<LoginResponseType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha }).then(res => res.data)
  },
  logout() {
    return instance.delete(`auth/login`).then(res => res.data)
  },
};