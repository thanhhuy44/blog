import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IComment {
  author: mongoose.Types.ObjectId;
  blog: mongoose.Types.ObjectId;
  content: string;
  parent?: mongoose.Types.ObjectId;
  children?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];
  like_count: number;
}

const CommentSchema = new Schema<IComment>({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
  content: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  like_count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
