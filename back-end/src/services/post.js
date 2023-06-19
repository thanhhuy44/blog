import Category from "../models/category.js";
import Post from "../models/post.js";
import mongoose, { ObjectId } from "mongoose";

const handleCreatePost = async (data) => {
  const { title, description, body, author, categories, thumbnail } = data;

  if (!title || !description || !body || !author || !categories || !thumbnail) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Post.create({
      ...data,
      alias: title.split(" ").join("-"),
      createdAt: Date.now(),
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

const handleGetRecentPosts = async () => {
  const response = await Post.find()
    .limit(4)
    .sort({ createdAt: -1 })
    .populate("author")
    .populate("categories")
    .then(async (result, error) => {
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
};

const handleGetAllPosts = async (page = 1, pageSize = 20, category) => {
  if (category === "all") {
    const response = await Post.find({})
      .populate("author")
      .populate("categories")
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .then(async (result, error) => {
        if (result) {
          const total = await Post.count();
          return {
            errCode: 0,
            message: "success!",
            data: result,
            pagination: {
              page,
              pageSize,
              total,
            },
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
  } else {
    if (mongoose.Types.ObjectId.isValid(category)) {
      const response = await Post.find({
        categories: category,
      })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .then(async (result, error) => {
          if (result) {
            const total = await Post.count({ categories: category });
            return {
              errCode: 0,
              message: "success!",
              data: result,
              pagination: {
                page,
                pageSize,
                total,
              },
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
    } else {
      return {
        errCode: 1,
        message: "form error!",
      };
    }
  }
};

const handleSearchPosts = async (keyword) => {
  if (!keyword) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const posts = await Post.find({
      title: { $regex: keyword, $options: "i" },
    }).then((result, error) => {
      if (result) {
        return result;
      } else {
        return error;
      }
    });
    const categories = await Category.find({
      name: { $regex: keyword, $options: "i" },
    }).then((result, error) => {
      if (result) {
        return result;
      } else {
        return "error";
      }
    });
    if (posts === "error" || categories === "error") {
      return {
        errCode: 1,
        message: "error!",
      };
    } else {
      return {
        errCode: 0,
        message: "success!",
        data: {
          categories,
          posts,
        },
      };
    }
  }
};

const PostServices = {
  handleCreatePost,
  handleGetRecentPosts,
  handleGetAllPosts,
  handleSearchPosts,
};

export default PostServices;
