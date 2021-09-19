import { User } from "@/api/config/Users";

export const SET_USER = (store: any, user: User) => {
  store.user = user;
}