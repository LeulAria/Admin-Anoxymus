import { TogglePayload } from "./state"

export const toggleGlobalSnackBar = (context: any, payload: TogglePayload) => {
  context.commit("TOGGLE_GLOBAL_SNACKBAR", payload)
}