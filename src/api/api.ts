import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "0a588f3a-4500-45fa-a13f-2d763f85a42b",
  },
});

type ProfileStatusFollowUnfollowType = {
  resultCode: ResultCodesEnum 
  messages: Array<string>
  data: {}
}
export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        return res.data;
      });
  },
  unfollow(id: number) {
    return instance.delete<ProfileStatusFollowUnfollowType>(`follow/${id}`).then(res => res.data)
  },
  follow(id: number) {
    return instance.post<ProfileStatusFollowUnfollowType>(`follow/${id}`).then(res => res.data)
  },
};

export const profileAPI = {
  getProfile(userId: number) { 
    return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
  },
  updateStatus(status: string) {
    return instance.put<ProfileStatusFollowUnfollowType>(`profile/status`, { status: status }).then(res => res.data)
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<ProfileStatusFollowUnfollowType>(`profile`, profile).then(res => res.data)
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  }
export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}
type LoginDataType = {
  data: {
    UserId: number
  }
  resultCode: ResultCodesEnum | ResultCodeForCaptcha
  messages: Array<string>
}
type LogoutDataType = {
  resultCode: ResultCodesEnum 
  messages: Array<string>
  data: {}
}
type getUserDataType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum 
  messages: Array<string>
}
export const authAPI = {
  getUserData() {
    return instance.get<getUserDataType>(`auth/me`).then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    return instance.post<LoginDataType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then(res => res.data)
  },
  logout() {
    return instance.delete<LogoutDataType>(`auth/login`).then(res => res.data)
  },
};

type CaptchaDataType = {
  url: string
}
export const securityAPI = {
  getCaptcha() {
    return instance.get<CaptchaDataType>(`security/get-captcha-url`).then(res => res.data)
  },
};
