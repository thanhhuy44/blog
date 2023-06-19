import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  parentComment: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
