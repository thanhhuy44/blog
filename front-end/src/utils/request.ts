import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const { CancelToken } = axios;
export let source: any;

request.interceptors.request.use(function (config) {
  const token = Cookies.get("token");
  config.headers.Authorization = token ? `${token}` : "";
  return config;
});

request.interceptors.response.use(
  (res) => {
    if (res.data?.errCode === 1) {
      toast.error(res.data.message);
    }
    return res.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
