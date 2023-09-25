import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  blogs?: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
  type?: "local" | "google";
}

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        select: false,
      },
    ],
    type: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    toJSON: {
      transform(doc, user) {
        delete user.password;
        delete user.comments;
      },
    },
  }
);

UserSchema.index({
  fullname: "text",
});

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
export default User;
