export const toggleGlobalTheme = (context: any) => {
  context.commit("TOGGLE_GLOBAL_THEME");
};

export const navbar = (context: any, show: boolean) => {
  context.commit("TOGGLE_NAV_SHOW", show);
};

export const logOut = (context: any) => {
  context.commit("LOGOUT_USER");
};
