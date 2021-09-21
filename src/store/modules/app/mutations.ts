export const TOGGLE_GLOBAL_SNACKBAR = (state: any, payload: any) => {
  state.globalSnackBar = payload;
  setTimeout(() => state.globalSnackBar = {
    show: false,
    type: "",
    text: ""
  }, 4000)
}