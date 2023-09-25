import mongoose from "mongoose";
import User, { IUser } from "../models/user";

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
        const user = await User.findById(id);
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

const UserServices = {
  getAll,
  search,
  getDetail,
  update,
  remove,
};

export default UserServices;
