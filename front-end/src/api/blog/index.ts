import axios from "axios";

const blogApi = {
  upload: (body: any) => {
    const url = "http://localhost:3030/api/post";
    return axios.post(url, body);
  },
};

export default blogApi;
