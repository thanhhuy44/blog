import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IBlog {
  title: string;
  banner: string;
  description: string;
  content: string;
  view_count: number;
  slug: string;
  likes?: mongoose.Types.ObjectId[];
  like_count: number;
  comments?: mongoose.Types.ObjectId[];
  comment_count: number;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  category: mongoose.Types.ObjectId;
  isPick: boolean;
  isMain: boolean;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  content: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      select: false,
    },
  ],
  like_count: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      select: false,
    },
  ],
  comment_count: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isPick: {
    type: Boolean,
    default: true,
  },
  isMain: {
    type: Boolean,
    default: true,
  },
});
BlogSchema.index({
  title: 'text',
});
const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;
