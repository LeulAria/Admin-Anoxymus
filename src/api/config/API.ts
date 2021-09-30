import axios from "axios";
import { HOST, APP_LOGIN_ROUTE, APP_API_KEY } from "./../../config/appConfig";

// server env
const loginURL = APP_LOGIN_ROUTE;
export const baseURL = HOST;
const apiKey = APP_API_KEY;

let token = null;

if (localStorage.getItem("app-cache")) {
  token =
    JSON.parse(localStorage.getItem("app-cache") || "")?.user?.user?.token ||
    null;
}

const API = axios.create({
  baseURL,
  headers: {
    Authorization: token ? "Bearer " + token : null,
    "Content-Type": "application/json",
    Accept: "application/json",
    apiKey,
  },
});

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;

//     // Prevent infinite loops
//     if (
//       error.response.status === 401 &&
//       originalRequest.url === baseURL + REFRESH_TOKEN
//     ) {
//       window.location.href = loginURL;
//       return Promise.reject(error);
//     }

//     if (
//       error.response.status === 401 &&
//       error.response.statusText === "Unauthorized"
//     ) {
//       const refreshToken = localStorage.getItem("refresh_token");

//       if (refreshToken) {
//         const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

//         // exp date in token is expressed in seconds, while now() returns milliseconds:
//         const now = Math.ceil(Date.now() / 1000);

//         if (tokenParts.exp > now) {
//           return API.post(
//             REFRESH_TOKEN,
//             {},
//             {
//               headers: {
//                 Authorization: `Bearer ${refreshToken}`,
//               },
//             }
//           )
//             .then((response) => {
//               console.log(
//                 "REFRESH TOKEN RESPONSE: ",
//                 response.data.data.access_token
//               );
//               localStorage.setItem("access_token", response.data.data.access_token);
//               localStorage.setItem(
//                 "refresh_token",
//                 response.data.data.refresh_token
//               );

//               API.defaults.headers[
//                 "Authorization"
//               ] = `Bearer ${response.data.data.access_token}`;
//               originalRequest.headers[
//                 "Authorization"
//               ] = `Bearer ${response.data.data.access_token}`;

//               return API(originalRequest);
//             })
//             .catch((err) => {
//               console.log("ERROR: ", err);
//             });
//         } else {
//           window.location.href = loginURL;
//         }
//       } else {
//         console.log("Refresh token not available.");
//         window.location.href = loginURL;
//       }
//     }

//     // specific error handling done elsewhere
//     return Promise.reject(error);
//   }
// );

export default API;
