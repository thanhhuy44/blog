import express from "express";
import UserControllers from "../controllers/user.js";
import PostControllers from "../controllers/post.js";
import CategoryControllers from "../controllers/category.js";
import CommentControllers from "../controllers/comment.js";

const router = express.Router();

const routers = (app) => {
  // user
  router.post("/signup", UserControllers.signup);
  router.post("/login", UserControllers.login);

  //category
  router.post("/category", CategoryControllers.create);
  router.get("/categories", CategoryControllers.getAll);
  router.get("/categories/delete", CategoryControllers.remove);

  //post
  router.post("/post", PostControllers.create);
  router.get("/posts", PostControllers.getAll);
  router.get("/posts/recent", PostControllers.getRecent);
  router.get("/posts/popular", PostControllers.getPopular);
  router.get("/posts/detail/:id", PostControllers.getDetail);
  router.get("/posts/search", PostControllers.search);

  //comment
  router.post("/comment", CommentControllers.create);
  router.post("/comments/update/:id", CommentControllers.update);
  router.get("/comments", CommentControllers.get);

  //404
  router.get("*", (req, res) => {
    res.status(404).json({
      errCode: 404,
      message: "Page not found",
    });
  });

  return app.use("/api", router);
};

export default routers;
