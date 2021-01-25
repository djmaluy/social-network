import { ProfileType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "0a588f3a-4500-45fa-a13f-2d763f85a42b",
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        return res.data;
      });
  },
  unfollow(id: number) {
    return instance.delete(`follow/${id}`);
  },
  follow(id: number) {
    return instance.post(`follow/${id}`);
  },
  getProfile(userId: number) {
    console.warn("This method is deprecated. Please, use profileAPI");

    return profileAPI.getProfile(userId);
  },
};

export const profileAPI = {
  getProfile(userId: number) { 
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
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
    return instance.put(`profile`, profile);
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchIsRequired = 10
}

export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}

type LoginDataType = {
  data: {
    UserId: number
  }
  resultCode: ResultCodeEnum | ResultCodeForCaptcha
  messages: Array<string>
}

type getUserDataType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodeEnum
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
    return instance.delete(`auth/login`).then(res => res.data)
  },
};

export const securityAPI = {
  getCaptcha() {
    return instance.get(`security/get-captcha-url`);
  },
};
