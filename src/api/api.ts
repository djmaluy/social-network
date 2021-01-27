import { UsersType } from './../types/types';
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "0a588f3a-4500-45fa-a13f-2d763f85a42b",
  },
});

export type ResponseType< D = {}, RC = ResultCodesEnum > = {
  data: D
  messages: Array<string>
  resultCode: RC
}
export type GetItemsType = {
  items: Array<UsersType> 
  totalCount: number
  error: string | null
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  }
  export enum ResultCodeForCaptchaEnum {
    CaptchIsRequired = 10
}





