import CategoryServices from "../services/category.js";

const create = async (req, res) => {
  const data = await CategoryServices.handleCreateCategory(req.body);
  return res.status(200).json(data);
};

const getAll = async (req, res) => {
  const data = await CategoryServices.handleGetAllCategory();
  return res.status(200).json(data);
};

const remove = async (req, res) => {
  const data = await CategoryServices.handleDeleteCategory(req.query.id);
  return res.status(200).json(data);
};

const CategoryControllers = {
  create,
  getAll,
  remove,
};

export default CategoryControllers;
