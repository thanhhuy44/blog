import { Comment, ResponseType } from '@/interface';
import request from '@/utils/request';

const CommentApi = {
  create: async (body: {
    author: string;
    content: string;
    blog: string;
    parent?: string;
  }) => {
    const response: ResponseType = await request.post('comments', body);
    if (response.errCode === 0) {
      return response.data as Comment;
    } else {
      return null;
    }
  },
};

export default CommentApi;
