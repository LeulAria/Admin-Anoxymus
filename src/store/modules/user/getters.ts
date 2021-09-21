export const userInfo = (store: any) => {
  return store.user
}
export const userAvatar = (store: any) => {
  return store.user.avatar;
}
export const isLoggedIn = (store: any): boolean => {
  return store?.user?.token;
}
