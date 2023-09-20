import request from "@/utils/request";

interface ResponseType {
  data?: any;
  errCode?: number;
  message?: string;
}

const AuthApi = {
  registerLocal: async (body: {
    fullname: string;
    email: string;
    password: string;
    type: "local" | "google" | "facebook";
  }) => {
    const response: ResponseType = await request.post("/register", {
      ...body,
      type: "local",
    });
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  },
  loginLocal: async (body: { email: string; password: string }) => {
    const response: ResponseType = await request.post("/login", body);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default AuthApi;
