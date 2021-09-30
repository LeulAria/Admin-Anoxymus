export const TOGGLE_GLOBAL_THEME = (state: any) => {
  state.globalTheme = !state.globalTheme;
};

export const SET_TOKEN = (state: any, token: string) => {
  state.token = token;
};

export const REMOVE_TOKEN = (state: any) => {
  state.token = "";
  state = "";
};

export const TOGGLE_NAV_SHOW = (state: any, show: boolean) => {
  state.navbar = show;
};

export const LOGOUT_USER = (state: any) => {
  state.user = {};
};
