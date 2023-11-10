import { Request, Response, Express } from "express";
import UserServices from "../services/user";
import { UploadedFile } from "express-fileupload";

const getAll = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const data = await UserServices.getAll(page, pageSize);

  return res.status(200).json(data);
};

const search = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const data = await UserServices.search(
    typeof req.query.keyword === "string" ? req.query.keyword : "",
    page,
    pageSize
  );

  return res.status(200).json(data);
};

const getDetail = async (req: Request, res: Response) => {
  const data = await UserServices.getDetail(req.params.id);

  return res.status(200).json(data);
};

const update = async (req: Request, res: Response) => {
  const data = await UserServices.update(req.params.id, req.body);

  return res.status(200).json(data);
};

const remove = async (req: Request, res: Response) => {
  const data = await UserServices.remove(req.params.id);
  return res.status(200).json(data);
};

const changeAvatar = async (req: Request, res: Response) => {
  const data = await UserServices.changeAvatar(
    req?.files?.avatar as UploadedFile,
    req?.authen?.user?._id
  );
  return res.status(200).json(data);
};

const UserControllers = {
  getAll,
  search,
  getDetail,
  update,
  remove,
  changeAvatar,
};

export default UserControllers;
