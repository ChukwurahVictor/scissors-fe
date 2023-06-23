import axios from "axios";
import { createBrowserHistory } from "history";
import { showToast } from "utils/show-toast";

const authToken = sessionStorage.getItem("auth-token");

if (authToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}

export const history = createBrowserHistory();

// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.data?.message !== "Invalid credentials!"
    ) {
      sessionStorage.removeItem("auth-token");
      showToast({
        type: "error",
        message: "Unauthorized, Please login to continue.",
      });
      history.replace(
        `/login`
      );
    }
    return Promise.reject(error);
  }
);
