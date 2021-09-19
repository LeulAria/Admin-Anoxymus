import { User } from "@/api/config/Users";
import { Store } from "vuex";

export const userInfo = (store: any) => {
  return store.user
}
export const userAvatar = (store: any) => {
  return store.user.avatar;
}
export const isLoggedIn = (store: any): User => {
  return store?.user.token as User
}