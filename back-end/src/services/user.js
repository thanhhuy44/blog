import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const handleSignUp = async (data) => {
  const { fullName, userName, email, phoneNumber, password } = data;
  if (!fullName || !userName || !email || !phoneNumber || !password) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await User.findOne({
      userName: data.userName,
    }).then(async (result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 1,
            message: "user already exist!",
            data: result,
          };
        } else {
          const user = await User.create(data).then((result, error) => {
            if (result) {
              return {
                errCode: 0,
                message: "success!",
                data: result,
              };
            } else {
              return {
                errCode: 1,
                message: "error!",
                data: error,
              };
            }
          });
          return user;
        }
      }
    });
    return response;
  }
};

const handleLogin = async (data) => {
  const { userName, password } = data;
  if (!userName || !password) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await User.findOne({
      userName: userName,
    })
      .select("+password")
      .then(async (result, error) => {
        if (error) {
          return {
            errCode: 1,
            message: "error!",
            data: error,
          };
        } else {
          if (result) {
            const samePassword = await bcrypt.compare(
              password,
              result.password
            );
            if (samePassword) {
              return {
                errCode: 0,
                message: "success!",
                data: result,
              };
            } else {
              return {
                errCode: 1,
                message: "wrong password!",
                data: {},
              };
            }
          } else {
            return {
              errCode: 1,
              message: "user not found!",
              data: {},
            };
          }
        }
      });
    return response;
  }
};

const handleChangePassword = async (data) => {
  const { password, newPassword, userId } = data;
  if (
    !password ||
    !newPassword ||
    !userId ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await User.findById(userId)
      .populate("password")
      .then(async (result, error) => {
        if (error) {
          return {
            errCode: 1,
            message: "error!",
            data: error,
          };
        } else {
          if (result) {
            const same = await bcrypt.compare(password, result.password);
            if (same) {
              const hashPassword = await bcrypt.hash(newPassword, 10);
              const updatePassword = await User.findByIdAndUpdate(
                { _id: userId },
                {
                  password: hashPassword,
                }
              ).then((result, error) => {
                if (error) {
                  return {
                    errCode: 1,
                    message: "error!",
                    data: error,
                  };
                } else {
                  if (result) {
                    return {
                      errCode: 0,
                      message: "success!",
                      data: result,
                    };
                  } else {
                    return {
                      errCode: 1,
                      message: "user not found!",
                    };
                  }
                }
              });
              return updatePassword;
            } else {
              return {
                errCode: "1",
                message: "wrong password!",
              };
            }
          } else {
            return {
              errCode: 1,
              message: "user not found!",
            };
          }
        }
      });
    return response;
  }
};

const UserServices = {
  handleSignUp,
  handleLogin,
  handleChangePassword,
};

export default UserServices;
