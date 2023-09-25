import { Request, Response } from "express";
import CommentServices from "../services/comment";

const create = async (req: Request, res: Response) => {
  const data = await CommentServices.create(req.body);
  return res.status(200).json(data);
};

const reaction = async (req: Request, res: Response) => {
  const data = await CommentServices.reaction(req.params.id, req.body);
  return res.status(200).json(data);
};

const edit = async (req: Request, res: Response) => {
  const data = await CommentServices.edit(req.params.id, req.body);
  return res.status(200).json(data);
};

const remove = async (req: Request, res: Response) => {
  const data = await CommentServices.remove(req.params.id);
  return res.status(200).json(data);
};

const CommentControllers = {
  create,
  reaction,
  edit,
  remove,
};

export default CommentControllers;
