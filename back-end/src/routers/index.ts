import express, { Application, Request, Response } from "express";
import AuthControllers from "../controllers/auth";
import BlogControllers from "../controllers/blog";
import CategoryControllers from "../controllers/category";
import CommentControllers from "../controllers/comment";

const router = express.Router();

const routers = (app: Application) => {
  router.get("/test", (req: Request, res: Response) => {
    res.send("Working OK!");
  });

  // auth
  router.post("/register", AuthControllers.register);
  router.post("/login", AuthControllers.login);
  router.post("/change-password", AuthControllers.changePassword);

  // blogs
  router.post("/blogs", BlogControllers.uploadBlog);
  router.get("/blogs", BlogControllers.getAll);
  router.get("/blogs/:id", BlogControllers.getDetail);

  //category
  router.post("/categories", CategoryControllers.create);
  router.get("/categories", CategoryControllers.getAll);
  router.get("/categories/:id", CategoryControllers.getDetail);
  router.put("/categories/:id", CategoryControllers.update);
  router.delete("/categories/:id", CategoryControllers.remove);

  // comment
  router.post("/comments", CommentControllers.create);
  router.post("/comments/reaction/:id", CommentControllers.reaction);
  router.put("/comments/edit/:id", CommentControllers.edit);
  router.delete("/comments/:id", CommentControllers.remove);

  //   404
  router.get("*", (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: "not found!",
      data: null,
    });
  });

  //   return
  return app.use("/api", router);
};

export default routers;
