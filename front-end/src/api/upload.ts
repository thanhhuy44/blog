import request from '@/utils/request';

interface ResponseType {
  data: string | null;
  errCode: number;
  message: string;
}

const UploadApi = {
  upload: async (body: { file: File }) => {
    console.log('🚀 ~ file: upload.ts:11 ~ upload: ~ file:', body.file);
    const response: ResponseType = await request.post('/upload', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    if (response.errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  },
};

export default UploadApi;
