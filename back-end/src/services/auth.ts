import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/user";

interface ResponseType {
  errCode: number;
  message: string;
  data: IUser | null;
}

const login = async (body: { email: string; password: string }) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!body.email || !body.password) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const user = await User.findOne({ email: body.email }).select(
          "+password"
        );
        if (user) {
          const isValidPassword = await bcrypt.compare(
            body.password,
            user.password
          );
          if (isValidPassword) {
            resolve({
              errCode: 0,
              message: "login success!",
              data: user,
            });
          } else {
            resolve({
              errCode: 1,
              message: "wrong password!",
              data: null,
            });
          }
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
        message: "error",
        data: null,
      });
    }
  });
};

const register = async (body: IUser) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!body.email || !body.fullname || !body.password) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const existUser = await User.findOne({ email: body.email });
        if (existUser) {
          resolve({
            errCode: 1,
            message: "email already exist!",
            data: null,
          });
        } else {
          const user: IUser = await User.create(body);
          if (user) {
            resolve({
              errCode: 0,
              message: "register success!",
              data: user,
            });
          } else {
            resolve({
              errCode: 1,
              message: "error!",
              data: null,
            });
          }
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

const changePassword = async (body: {
  id: string;
  currentPassword: string;
  newPassword: string;
}) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(body.id) ||
        !body.currentPassword ||
        !body.newPassword
      ) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const user = await User.findById(body.id).select("+password");
        if (user) {
          const isValidPassword = await bcrypt.compare(
            body.currentPassword,
            user.password
          );
          if (isValidPassword) {
            const hashPassword = await bcrypt.hash(body.newPassword, 10);
            const userUpdated = await User.findByIdAndUpdate(body.id, {
              password: hashPassword,
            });
            if (userUpdated) {
              resolve({
                errCode: 0,
                message: "change password success!",
                data: userUpdated,
              });
            } else {
              resolve({
                errCode: 1,
                message: "error!",
                data: null,
              });
            }
          } else {
            resolve({
              errCode: 1,
              message: "wrong password!",
              data: null,
            });
          }
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

const AuthServices = {
  login,
  register,
  changePassword,
};

export default AuthServices;
