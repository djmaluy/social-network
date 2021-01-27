
import { instance, GetItemsType, ResponseType } from './api';

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance
      .get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => {
        return res.data;
      });
  },
  unfollow(id: number) {
    return instance.delete(`follow/${id}`).then(res => res.data) as Promise<ResponseType>
  },
  follow(id: number) {
    return instance.post<ResponseType>(`follow/${id}`).then(res => res.data)
  },
};