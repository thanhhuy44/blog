import { UploadedFile } from "express-fileupload";
import { b2 } from "../index";
interface ResponseType {
  errCode: number;
  message: string;
  data: string | null;
}

const upload = async (file: UploadedFile) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    if (!file) {
      resolve({
        errCode: 1,
        message: "form error!",
        data: null,
      });
    } else {
      await b2
        .getUploadUrl({
          bucketId: "84def1e2e7afea948aad041d",
        })
        .then(async (response: any) => {
          await b2
            .uploadFile({
              uploadUrl: response.data.uploadUrl,
              uploadAuthToken: response.data.authorizationToken,
              fileName: file.name,
              data: file.data,
              onUploadProgress: (event: any) => {},
            })
            .then(async (response: any) => {
              if (response) {
                resolve({
                  errCode: 0,
                  message: "success!",
                  data: `https://my-blog-assets.s3.us-east-005.backblazeb2.com/${response?.data?.fileName}`,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "error!",
                  data: null,
                });
              }
            });
        });
    }

    try {
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const UploadService = {
  upload,
};

export default UploadService;
