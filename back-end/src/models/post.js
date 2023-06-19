import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  ],
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
