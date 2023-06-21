import UserServices from "../services/user.js";

const signup = async (req, res) => {
  const data = await UserServices.handleSignUp(req.body);
  return res.status(200).json(data);
};

const login = async (req, res) => {
  const data = await UserServices.handleLogin(req.body);
  return res.status(200).json(data);
};

const changePassword = async (req, res) => {
  const data = await UserServices.handleChangePassword(req.body);
  return res.status(200).json(data);
};

const UserControllers = {
  signup,
  login,
  changePassword,
};

export default UserControllers;
