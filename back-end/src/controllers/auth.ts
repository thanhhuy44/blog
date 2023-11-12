import { Request, Response } from 'express';
import AuthServices from '../services/auth';

const register = async (req: Request, res: Response) => {
  const data = await AuthServices.register(req.body);
  return res.status(200).json(data);
};

const login = async (req: Request, res: Response) => {
  const data = await AuthServices.login(req.body);
  return res.status(200).json(data);
};

const changePassword = async (req: Request, res: Response) => {
  const data = await AuthServices.changePassword({
    ...req.body,
    id: req?.authen?.user?._id,
  });
  return res.status(200).json(data);
};

const AuthControllers = {
  register,
  login,
  changePassword,
};

export default AuthControllers;
