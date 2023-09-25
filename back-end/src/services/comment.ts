import mongoose from "mongoose";
import Comment, { IComment } from "../models/comment";
import Blog from "../models/blog";
import { ReactionType } from "../constants";

interface ResponseType {
  errCode: number;
  message: string;
  data: IComment | IComment[] | null;
}

const create = async (body: IComment) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (
        (!body.author && !mongoose.Types.ObjectId.isValid(body.author)) ||
        (!body.blog && !mongoose.Types.ObjectId.isValid(body.blog)) ||
        !body.content ||
        (body.parent && !mongoose.Types.ObjectId.isValid(body.parent))
      ) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const isExistBlog = await Blog.findById(body.blog);
        if (isExistBlog) {
          if (body.parent) {
            const isExistParent = await Comment.findById(body.parent);
            if (isExistParent) {
              const newComment = await Comment.create(body);
              if (newComment) {
                resolve({
                  errCode: 1,
                  message: "success!",
                  data: newComment,
                });
              } else {
                resolve({
                  errCode: 0,
                  message: "error!",
                  data: null,
                });
              }
            } else {
              resolve({
                errCode: 0,
                message: "comment not found to reply!",
                data: null,
              });
            }
          } else {
            const newComment = await Comment.create(body);
            if (newComment) {
              resolve({
                errCode: 1,
                message: "success!",
                data: newComment,
              });
            } else {
              resolve({
                errCode: 0,
                message: "error!",
                data: null,
              });
            }
          }
        } else {
          resolve({
            errCode: 0,
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

const edit = async (id: string, body: { content: string }) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id) || !body.content) {
        resolve({
          errCode: 1,
          message: "form error",
          data: null,
        });
      } else {
        const updatedComment = await Comment.findByIdAndUpdate(id, body);
        if (updatedComment) {
          resolve({
            errCode: 0,
            message: "success!",
            data: updatedComment,
          });
        } else {
          resolve({
            errCode: 1,
            message: "comment not found!",
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

const remove = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (deletedComment) {
          resolve({
            errCode: 0,
            message: "success!",
            data: deletedComment,
          });
        } else {
          resolve({
            errCode: 1,
            message: "comment not found!",
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
          message: "form error!",
          data: null,
        });
      } else {
        const userMongoId = new mongoose.Types.ObjectId(body.user);
        const comment = await Comment.findById(id);
        if (comment) {
          if (body.action === ReactionType.LIKE) {
            if (comment.likes?.includes(userMongoId)) {
              resolve({
                errCode: 1,
                message: "already liked!",
                data: null,
              });
            } else {
              const updatedComment = await Comment.findByIdAndUpdate(id, {
                $inc: { like_count: 1 },
                $push: { likes: body.user },
              });
              if (updatedComment) {
                resolve({
                  errCode: 0,
                  message: "success!",
                  data: updatedComment,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "comment not found!",
                  data: null,
                });
              }
            }
          } else if (body.action === ReactionType.UNLIKE) {
            if (!comment.likes?.includes(userMongoId)) {
              resolve({
                errCode: 1,
                message: "already unliked!",
                data: null,
              });
            } else {
              const updatedComment = await Comment.findByIdAndUpdate(id, {
                $inc: { like_count: -1 },
                $pull: { likes: body.user },
              });
              if (updatedComment) {
                resolve({
                  errCode: 0,
                  message: "success!",
                  data: updatedComment,
                });
              } else {
                resolve({
                  errCode: 1,
                  message: "comment not found!",
                  data: null,
                });
              }
            }
          } else {
            resolve({
              errCode: 1,
              message: "action invalid!",
              data: null,
            });
          }
        } else {
          resolve({
            errCode: 1,
            message: "comment not found!",
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

const CommentServices = {
  create,
  edit,
  reaction,
  remove,
};

export default CommentServices;
