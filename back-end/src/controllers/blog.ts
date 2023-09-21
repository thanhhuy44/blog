import { Request, Response } from "express";
import BlogServices from "../services/blog";

const uploadBlog = async (req: Request, res: Response) => {
  const data = await BlogServices.uploadBlog(req.body);
  return res.status(200).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const data = await BlogServices.getAll();
  return res.status(200).json(data);
};

const getDetail = async (req: Request, res: Response) => {
  const data = await BlogServices.getDetail(req.params.id);
  return res.status(200).json(data);
};

const BlogControllers = {
  uploadBlog,
  getAll,
  getDetail,
};

export default BlogControllers;
