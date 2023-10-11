import request from "@/utils/request";
import { ResponseType } from "@/interface";
import Cookies from "js-cookie";

const AuthApi = {
  registerLocal: async (body: {
    fullname: string;
    email: string;
    password: string;
    type: "local" | "google" | "facebook";
  }) => {
    const response: ResponseType = await request.post("/auth/register", {
      ...body,
      type: "local",
    });
    if (response.data) {
      if (response.token) {
        Cookies.set("token", response.token);
      }
      return response.data;
    } else {
      return null;
    }
  },
  loginLocal: async (body: { email: string; password: string }) => {
    const response: ResponseType = await request.post("/auth/login", body);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default AuthApi;
