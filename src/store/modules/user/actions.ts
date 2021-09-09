export interface IUser {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  stuff: boolean;
}

export const setUser = (context: any, user: IUser) => {
  context.commit('SET_USER', user )
}

export const logOut = (context: any) => {
  localStorage.clear();
  context.commit('LOGOUT_USER');
}