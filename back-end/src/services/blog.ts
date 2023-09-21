import mongoose from "mongoose";
import Blog, { IBlog } from "../models/blog";
import { Pagination } from "../constants";

interface ResponseType {
  errCode: number;
  message: string;
  data: IBlog | null | IBlog[];
  pagination?: Pagination;
}

const uploadBlog = async (body: IBlog) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (
        !body.title ||
        !body.author ||
        !mongoose.Types.ObjectId.isValid(body?.author) ||
        !body.banner ||
        !body.content ||
        !body.description
      ) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const blog = await Blog.create({
          ...body,
          slug: body.title.toLowerCase().trim().replaceAll(" ", "-"),
          createdAt: Date.now(),
        });
        if (blog) {
          resolve({
            errCode: 0,
            message: "success!",
            data: blog,
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

const getAll = async (page: number = 1, pageSize: number = 10) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      const blogs = await Blog.find({})
        .populate("author")
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      if (blogs) {
        const total = await Blog.count();
        resolve({
          errCode: 0,
          message: "success!",
          data: blogs,
          pagination: {
            page,
            pageSize,
            totalPage: Math.ceil(total / pageSize),
            total,
          },
        });
      } else {
        resolve({
          errCode: 1,
          message: "haven't blogs!",
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
        const blog = await Blog.findById(id)
          .select("+likes+comments")
          .populate("likes")
          .populate("comments")
          .populate("author")
          .populate("category");
        if (blog) {
          resolve({
            errCode: 0,
            message: "success!",
            data: blog,
          });
        } else {
          resolve({
            errCode: 1,
            message: "blog not found!",
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

const BlogServices = {
  uploadBlog,
  getAll,
  getDetail,
};

export default BlogServices;
