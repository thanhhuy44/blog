import CommentServices from "../services/comment.js";

const create = async (req, res) => {
  const data = await CommentServices.handleCreateComment(req.body);
  return res.status(200).json(data);
};

const update = async (req, res) => {
  const data = await CommentServices.handleUpdateComment(
    req.params.id,
    req.body
  );
  return res.status(200).json(data);
};

const CommentControllers = {
  create,
  update,
};

export default CommentControllers;
