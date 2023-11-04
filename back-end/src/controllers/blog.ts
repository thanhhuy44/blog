import { Request, Response } from 'express';
import BlogServices from '../services/blog';

const uploadBlog = async (req: Request, res: Response) => {
  const data = await BlogServices.uploadBlog(req.body);
  return res.status(200).json(data);
};

const getAll = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const pageSize: number = Number(req.query.pageSize) || 10;
  const category = req.query.category;
  if (typeof category === 'string') {
    const data = await BlogServices.getAll(page, pageSize, category);
    return res.status(200).json(data);
  } else {
    const data = await BlogServices.getAll(page, pageSize);
    return res.status(200).json(data);
  }
};

const getPopular = async (req: Request, res: Response) => {
  const data = await BlogServices.getPopular();
  return res.status(200).json(data);
};

const getEditorPick = async (req: Request, res: Response) => {
  const data = await BlogServices.getEditorPick();
  return res.status(200).json(data);
};

const search = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) | 10;
  const data = await BlogServices.search(
    typeof req.query.keyword === 'string' ? req.query.keyword : '',
    page,
    pageSize
  );
  return res.status(200).json(data);
};

const getDetail = async (req: Request, res: Response) => {
  const data = await BlogServices.getDetail(req.params.id);
  return res.status(200).json(data);
};

const reaction = async (req: Request, res: Response) => {
  const data = await BlogServices.reaction(req.params.id, req.body);
  return res.status(200).json(data);
};

const remove = async (req: Request, res: Response) => {
  const data = await BlogServices.remove(req.params.id);
  return res.status(200).json(data);
};

const BlogControllers = {
  uploadBlog,
  getAll,
  getDetail,
  getPopular,
  getEditorPick,
  reaction,
  remove,
  search,
};

export default BlogControllers;
