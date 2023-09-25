import { Request, Response } from "express";
import CategoryServices from "../services/category";

const create = async (req: Request, res: Response) => {
  const data = await CategoryServices.create(req.body);
  return res.status(200).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const data = await CategoryServices.getAll();
  return res.status(200).json(data);
};

const getDetail = async (req: Request, res: Response) => {
  const data = await CategoryServices.getDetail(req.params.id);
  return res.status(200).json(data);
};

const update = async (req: Request, res: Response) => {
  const data = await CategoryServices.update(req.params.id, req.body);
  return res.status(200).json(data);
};

const remove = async (req: Request, res: Response) => {
  const data = await CategoryServices.remove(req.params.id);
  return res.status(200).json(data);
};

const CategoryControllers = {
  create,
  getAll,
  getDetail,
  update,
  remove,
};

export default CategoryControllers;
