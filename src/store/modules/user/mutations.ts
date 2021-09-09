export const SET_USER = (store: any, user: any) => {
  console.log("SET USER IN MUTATION")
  store.user = user;
}

export const LOGOUT_USER = (store: any) => {
  store = {
    user: {}
  }
}