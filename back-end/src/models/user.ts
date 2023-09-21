import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

export interface IUser {
  fullname: string;
  email: string;
  password: string;
  posts?: string[];
  comments?: string[];
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
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
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
      },
    },
  }
);

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
export default User;
