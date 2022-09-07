import axios from "axios";
const baseUrl = "http://localhost:5000/api";

axios.defaults.baseURL = "http://localhost:5000/api";
export const axiosApi = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});
axios.defaults.withCredentials = true;
axiosApi.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      //   localStorage.removeItem("tah");
      //   localStorage.removeItem("CrU");

      // @ts-ignore
      window.location.replace("/login");
    }
  }
);
// export function useAuth() {}
export const api = {
  get: <T>(url: string = "", params?: object) =>
    axiosApi.get<T>(baseUrl + url, {
      ...params,
    }),
  post: <T>(url: string = "", data: any, params?: object) =>
    axiosApi.post<T>(baseUrl + url, data, {
      ...params,
    }),
  patch: <T>(url: string = "", data: any, params?: object) =>
    axiosApi.patch<T>(baseUrl + url, data, {
      ...params,
    }),
  delete: <T>(url: string = "") => axiosApi.delete<T>(baseUrl + url),
};
