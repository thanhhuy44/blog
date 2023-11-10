import mongoose from "mongoose";
import User, { IUser } from "../models/user";
import { FileArray, UploadedFile } from "express-fileupload";
import { b2 } from "../index";

interface ResponseType {
  errCode: number;
  message: string;
  data: IUser | IUser[] | null;
}

const getAll = async (page: number = 1, pageSize: number = 10) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      const users = await User.find({})
        .populate("blogs")
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      if (users) {
        resolve({
          errCode: 0,
          message: "success!",
          data: users,
        });
      } else {
        resolve({
          errCode: 1,
          message: "haven't user!",
          data: null,
        });
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const search = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!keyword || keyword.trim() === "") {
        resolve({
          errCode: 1,
          message: "invalid keyword!",
          data: null,
        });
      } else {
        const users = await User.find({ $text: { $search: keyword } })
          .populate("blogs")
          .skip((page - 1) * pageSize)
          .limit(pageSize);

        if (users) {
          resolve({
            errCode: 0,
            message: "success!",
            data: users,
          });
        } else {
          resolve({
            errCode: 1,
            message: "error!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const getDetail = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: "invalid id!",
          data: null,
        });
      } else {
        const user = await User.findById(id).populate("blogs");
        if (user) {
          resolve({
            errCode: 0,
            message: "success!",
            data: user,
          });
        } else {
          resolve({
            errCode: 0,
            message: "error!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const update = async (id: string, body: IUser) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id) || !body) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const user = await User.findByIdAndUpdate(id, body);
        if (user) {
          resolve({
            errCode: 0,
            message: "success!",
            data: user,
          });
        } else {
          resolve({
            errCode: 0,
            message: "user not found!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const remove = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: "invalid id!",
          data: null,
        });
      } else {
        const removedUser = await User.findByIdAndDelete(id);
        if (removedUser) {
          resolve({
            errCode: 0,
            message: "success!",
            data: removedUser,
          });
        } else {
          resolve({
            errCode: 1,
            message: "user not found!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const changeAvatar = async (file: UploadedFile, id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!file || !id || !mongoose.Types.ObjectId.isValid(id)) {
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
            const time = Date.now();
            const fileExtension = file.name.split(".").pop();
            await b2
              .uploadFile({
                uploadUrl: response.data.uploadUrl,
                uploadAuthToken: response.data.authorizationToken,
                fileName: `${file.name.replace(
                  `.${fileExtension}` as string,
                  ""
                )}-${time}.${fileExtension}`,
                data: file.data,
                onUploadProgress: (event: any) => {},
              })
              .then(async (response: any) => {
                if (response) {
                  const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                      avatar: `https://my-blog-assets.s3.us-east-005.backblazeb2.com/${response?.data?.fileName}`,
                    },
                    { new: true }
                  );
                  if (updatedUser) {
                    resolve({
                      errCode: 0,
                      message: "success!",
                      data: updatedUser,
                    });
                  } else {
                    resolve({
                      errCode: 1,
                      message: "user not found!",
                      data: null,
                    });
                  }
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
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const UserServices = {
  getAll,
  search,
  getDetail,
  update,
  remove,
  changeAvatar,
};

export default UserServices;
