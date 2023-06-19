import CategoryServices from "../services/category.js";

const create = async (req, res) => {
  const data = await CategoryServices.handleCreateCategory(req.body);
  return res.status(200).json(data);
};

const CategoryControllers = {
  create,
};

export default CategoryControllers;
