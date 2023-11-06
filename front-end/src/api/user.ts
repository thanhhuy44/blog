import request from '@/utils/request';
import { ResponseType } from '@/interface';

const UserApi = {
  getDetail: async (id: string) => {
    const response: ResponseType = await request.get(`/users/${id}`);
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default UserApi;
