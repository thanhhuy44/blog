import mongoose from "mongoose";
import Comment from "../models/comment.js";

const handleCreateComment = async (data) => {
  const { text, user, post } = data;
  if (!text || !user || !post) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Comment.create({
      ...data,
      createdAt: Date.now(),
    }).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: "success",
          data: result,
        };
      } else {
        return {
          errCode: 1,
          message: "error",
          data: error,
        };
      }
    });
    return response;
  }
};

const handleUpdateComment = async (id, data) => {
  if (!id) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Comment.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...data,
      }
    ).then((result, error) => {
      if (error) {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      } else {
        if (result) {
          return {
            errCode: 0,
            message: "success!",
            data: result,
          };
        } else {
          return {
            errCode: 1,
            message: "not found!",
          };
        }
      }
    });
    return response;
  }
};

const handleGetCommentsOfPost = async (postId, page = 1, pageSize = 10) => {
  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Comment.find({
      post: postId,
      parentComment: { $exists: false },
    }).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: "success!",
          data: result,
        };
      } else {
        return {
          errCode: 1,
          message: "error!",
          data: error,
        };
      }
    });
    return response;
  }
};

const CommentServices = {
  handleCreateComment,
  handleUpdateComment,
  handleGetCommentsOfPost,
};

export default CommentServices;
