import { User } from "@/api/config/Users";

export const userInfo = (store: any): User => {
  return store.user as User;
};
export const userAvatar = (store: any) => {
  return store.user.avatar;
};
export const isLoggedIn = (store: any): boolean => {
  return store?.user?.token ? true : false;
};
