import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface ICategory {
  name: string;
  description: string;
  blogs?: mongoose.Types.ObjectId[];
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
