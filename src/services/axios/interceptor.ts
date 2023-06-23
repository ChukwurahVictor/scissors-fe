import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { showToast } from "utils/show-toast";
import { baseUrl } from './urls';
import { createBrowserHistory } from "history";

const axios = Axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' }
});

export const history = createBrowserHistory();

const axiosConfiguration = (config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem('auth-token');
  if (token)
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`
    };
  return config;
};

axios.interceptors.request.use(axiosConfiguration as any);

axios.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error: any) => {
    if (error instanceof AxiosError && error.response?.status === 401){
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

export default axios;
