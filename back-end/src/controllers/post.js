import PostServices from "../services/post.js";

const create = async (req, res) => {
  const data = await PostServices.handleCreatePost(req.body);
  return res.status(200).json(data);
};

const getRecent = async (req, res) => {
  const data = await PostServices.handleGetRecentPosts();
  return res.status(200).json(data);
};

const getAll = async (req, res) => {
  const data = await PostServices.handleGetAllPosts(
    parseInt(req.query.page, 10) || 1,
    parseInt(req.query.limit, 10) || 20,
    req.query.category || "all"
  );
  return res.status(200).json(data);
};

const search = async (req, res) => {
  const data = await PostServices.handleSearchPosts(req.query.keyword);
  return res.status(200).json(data);
};

const PostControllers = {
  create,
  getRecent,
  getAll,
  search,
};

export default PostControllers;
