import axios from "axios";
import urls from "./urls";

export const cleanedParams = <T>(queryParams: T) => {
  const params: any = {};
  if (queryParams) {
    const keys = Object.keys(queryParams) as Array<keyof T>;
    keys.forEach(key => {
      if (!(queryParams[key] === undefined || queryParams[key] === "")) {
        params[key] = queryParams[key];
      }
    });
  }
  return params;
};

export const fetchUrls = () => {
  return axios({
    method: "get",
    url: urls.fetchUrls,
  });
};

export const fetchSingleUrl = (id: string) => {
  return axios({
    method: "get",
    url: urls.fetchSingleUrl,
  });
};
