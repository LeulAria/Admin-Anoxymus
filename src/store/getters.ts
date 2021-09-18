export const globalTheme = (state: any) => {
  return state.globalTheme;
}
export const navbar = (state: any) => {
  return state.navbar
}
export const loggedIn = (state: any): boolean => {
  return (
    state?.user.email !== null &&
    state?.user.email !== undefined
  );
}