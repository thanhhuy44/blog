import mongoose from 'mongoose';
import Blog, { IBlog } from '../models/blog';
import { Pagination, ReactionType } from '../constants';
import User from '../models/user';
import Category from '../models/category';

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
          message: 'form error!',
          data: null,
        });
      } else {
        const isExistAuthor = await User.findById(body.author);
        if (isExistAuthor) {
          const slug = body.title.toLowerCase().trim().replaceAll(' ', '-');
          const isExistBlog = await Blog.findOne({ slug: slug });
          if (isExistBlog) {
            resolve({
              errCode: 1,
              message: 'title blog is exist!',
              data: null,
            });
          } else {
            const blog = await Blog.create({
              ...body,
              slug: body.title.toLowerCase().trim().replaceAll(' ', '-'),
              createdAt: Date.now(),
            });
            if (blog) {
              if (
                body.category &&
                mongoose.Types.ObjectId.isValid(body.category)
              ) {
                await Category.findOneAndUpdate(body.category, {
                  $push: blog._id,
                });
              }

              resolve({
                errCode: 0,
                message: 'success!',
                data: blog,
              });
            } else {
              resolve({
                errCode: 0,
                message: 'error!',
                data: null,
              });
            }
          }
        } else {
          resolve({
            errCode: 1,
            message: 'author not found!',
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const getAll = async (
  page: number = 1,
  pageSize: number = 10,
  category?: string
) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      let blogs;
      if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
          blogs = await Blog.find({ category })
            .sort('-createdAt')
            .populate('author')
            .populate('category')
            .skip((page - 1) * pageSize)
            .limit(pageSize);
          if (blogs.length) {
            const total = await Blog.count();
            resolve({
              errCode: 0,
              message: 'success!',
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
        } else {
          resolve({
            errCode: 1,
            message: 'invalid category!',
            data: null,
          });
        }
      } else {
        blogs = await Blog.find({})
          .sort('-createdAt')
          .populate('author')
          .populate('category')
          .skip((page - 1) * pageSize)
          .limit(pageSize);
        if (blogs.length) {
          const total = await Blog.count();
          resolve({
            errCode: 0,
            message: 'success!',
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
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const getPopular = async () => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      const blogs = await Blog.find({ isMain: true })
        .limit(5)
        .populate('category')
        .populate('author');
      if (blogs.length) {
        resolve({
          errCode: 0,
          message: 'success!',
          data: blogs,
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
        message: 'error!',
        data: null,
      });
    }
  });
};

const getEditorPick = async () => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    const blogs = await Blog.find({ isPick: true })
      .limit(4)
      .populate('author')
      .populate('category');
    if (blogs.length) {
      resolve({
        errCode: 0,
        message: 'cussess!',
        data: blogs,
      });
    } else {
      resolve({
        errCode: 1,
        message: "haven't blogs!",
        data: null,
      });
    }
    try {
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
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
          message: 'invalid id!',
          data: null,
        });
      } else {
        const blog = await Blog.findByIdAndUpdate(id, {
          $inc: { view_count: 1 },
        })
          .select('+likes +comments')
          .populate('likes')
          .populate({
            path: 'comments',
            populate: {
              path: 'author',
            },
          })
          .populate({
            path: 'comments',
            populate: {
              path: 'children',
              populate: {
                path: 'author',
              },
            },
          })
          .populate('author')
          .populate('category');
        if (blog) {
          resolve({
            errCode: 0,
            message: 'success!',
            data: blog,
          });
        } else {
          resolve({
            errCode: 1,
            message: 'blog not found!',
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const reaction = async (id: string, body: { action: string; user: string }) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (
        !id ||
        !mongoose.Types.ObjectId.isValid(id) ||
        !body.action ||
        (body.action !== ReactionType.LIKE &&
          body.action !== ReactionType.UNLIKE) ||
        !body.user ||
        !mongoose.Types.ObjectId.isValid(body.user)
      ) {
        resolve({
          errCode: 1,
          message: 'form error!',
          data: null,
        });
      } else {
        const userMongoId = new mongoose.Types.ObjectId(body.user);
        const blog = await Blog.findById(id).select('+likes');
        if (blog) {
          if (body.action === ReactionType.LIKE) {
            if (blog.likes?.includes(userMongoId)) {
              resolve({
                errCode: 1,
                message: 'already liked!',
                data: null,
              });
            } else {
              const updatedBlog = await Blog.findByIdAndUpdate(id, {
                $inc: { like_count: 1 },
                $push: { likes: userMongoId },
              });
              if (updatedBlog) {
                resolve({
                  errCode: 0,
                  message: 'success!',
                  data: updatedBlog,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: 'blog not found!',
                  data: null,
                });
              }
            }
          } else if (body.action === ReactionType.UNLIKE) {
            if (!blog.likes?.includes(userMongoId)) {
              resolve({
                errCode: 1,
                message: 'already unliked!',
                data: null,
              });
            } else {
              const updatedBlog = await Blog.findByIdAndUpdate(id, {
                $inc: { like_count: -1 },
                $pull: { likes: body.user },
              });
              if (updatedBlog) {
                resolve({
                  errCode: 0,
                  message: 'success!',
                  data: updatedBlog,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: 'comment not found!',
                  data: null,
                });
              }
            }
          } else {
            resolve({
              errCode: 1,
              message: 'action invalid!',
              data: null,
            });
          }
        } else {
          resolve({
            errCode: 1,
            message: 'blog not found!',
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const remove = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: 'form error!',
          data: null,
        });
      } else {
        const removedBlog = await Blog.findByIdAndDelete(id);
        if (removedBlog) {
          resolve({
            errCode: 0,
            message: 'success!',
            data: removedBlog,
          });
        } else {
          resolve({
            errCode: 1,
            message: 'blog not found!',
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const search = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10
) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!keyword || keyword.trim() === '') {
        resolve({
          errCode: 1,
          message: 'invalid keyword!',
          data: null,
        });
      } else {
        const blogs = await Blog.find({ $text: { $search: keyword } })
          .populate('author')
          .skip((page - 1) * pageSize)
          .limit(pageSize);

        if (blogs) {
          resolve({
            errCode: 0,
            message: 'success!',
            data: blogs,
          });
        } else {
          resolve({
            errCode: 1,
            message: 'error!',
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: 'error!',
        data: null,
      });
    }
  });
};

const BlogServices = {
  uploadBlog,
  getAll,
  getDetail,
  getPopular,
  getEditorPick,
  reaction,
  remove,
  search,
};

export default BlogServices;
