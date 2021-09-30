import { User } from "@/api/config/Users";

export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  stuff: boolean;
}

export const setUser = (context: any, user: User) => {
  context.commit("SET_USER", user);
};
