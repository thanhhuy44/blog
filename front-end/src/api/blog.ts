import { ResponseType } from '@/interface';
import request from '@/utils/request';

const BlogApi = {
  upload: async (body: {
    title: string;
    author: string;
    banner: string;
    content: string;
    description: string;
  }) => {
    const response: ResponseType = await request.post('/blogs', body);
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
  getAll: async () => {
    const response: ResponseType = await request.get('/blogs', {
      params: {
        page: 1,
        pageSize: 20,
      },
    });
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
  getPopular: async () => {
    const response: ResponseType = await request.get('/blogs/popular');
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
  getEditorPick: async () => {
    const response: ResponseType = await request.get('/blogs/editor-pick');
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
  getDetail: async (id: string) => {
    const response: ResponseType = await request.get(`/blogs/${id}`);
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default BlogApi;
