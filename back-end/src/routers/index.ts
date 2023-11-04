import express, { Application, Request, Response } from 'express';
import AuthControllers from '../controllers/auth';
import BlogControllers from '../controllers/blog';
import CategoryControllers from '../controllers/category';
import CommentControllers from '../controllers/comment';
import UserControllers from '../controllers/user';
import { authenticateToken } from '../middlewares/auth';
import UploadController from '../controllers/upload';

const router = express.Router();

const routers = (app: Application) => {
  router.get('/test', (req: Request, res: Response) => {
    res.send('Working OK!');
  });

  // auth
  router.post('/auth/register', AuthControllers.register);
  router.post('/auth/login', AuthControllers.login);
  router.post('/auth/change-password', AuthControllers.changePassword);

  // blogs
  router.post('/blogs', authenticateToken, BlogControllers.uploadBlog);
  router.get('/blogs', BlogControllers.getAll);
  router.get('/blogs/search', BlogControllers.search);
  router.get('/blogs/popular', BlogControllers.getPopular);
  router.get('/blogs/editor-pick', BlogControllers.getEditorPick);
  router.get('/blogs/:id', BlogControllers.getDetail);
  router.post(
    '/blogs/reaction/:id',
    authenticateToken,
    BlogControllers.reaction
  );
  router.delete('/blogs/:id', authenticateToken, BlogControllers.remove);

  //category
  router.post('/categories', authenticateToken, CategoryControllers.create);
  router.get('/categories', CategoryControllers.getAll);
  router.get('/categories/:id', CategoryControllers.getDetail);
  router.put('/categories/:id', authenticateToken, CategoryControllers.update);
  router.delete(
    '/categories/:id',
    authenticateToken,
    CategoryControllers.remove
  );

  // comment
  router.post('/comments', authenticateToken, CommentControllers.create);
  router.post(
    '/comments/reaction/:id',
    authenticateToken,
    CommentControllers.reaction
  );
  router.put('/comments/edit/:id', authenticateToken, CommentControllers.edit);
  router.delete('/comments/:id', authenticateToken, CommentControllers.remove);

  // user
  router.get('/users', UserControllers.getAll);
  router.put('/users/upload', authenticateToken, UserControllers.changeAvatar);
  router.get('/users/search', UserControllers.search);
  router.get('/users/:id', UserControllers.getDetail);
  router.put('/users/:id', authenticateToken, UserControllers.update);
  router.delete('/users/:id', authenticateToken, UserControllers.remove);

  // upload
  router.post('/upload', UploadController.upload);

  //   404
  router.get('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });
  router.post('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });
  router.put('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });
  router.delete('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });

  router.patch('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });

  router.head('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });

  router.options('*', (req: Request, res: Response) => {
    return res.status(404).json({
      errCode: 404,
      message: 'not found!',
      data: null,
    });
  });
  //   return
  return app.use('/api', router);
};

export default routers;
