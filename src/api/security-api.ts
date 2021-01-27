import { instance } from './api';

type CaptchaDataType = {
  url: string
}

export const securityAPI = {
  getCaptcha() {
    return instance.get<CaptchaDataType>(`security/get-captcha-url`).then(res => res.data)
  },
};