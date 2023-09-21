import express, { Application, Request, Response } from "express";
import AuthControllers from "../controllers/auth";
import BlogControllers from "../controllers/blog";

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
  router.post("/upload", BlogControllers.uploadBlog);
  router.get("/blogs", BlogControllers.getAll);
  router.get("/blogs/:id", BlogControllers.getDetail);

  //   404
  router.get("*", (req: Request, res: Response) => {
    res.status(404).json({
      errCode: 404,
      message: "not found!",
    });
  });

  //   return
  return app.use("/api", router);
};

export default routers;
