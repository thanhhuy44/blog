import Category from "../models/category.js";

const handleCreateCategory = async (data) => {
  const { name, description } = data;
  if (!name || !description) {
    return {
      errCode: 1,
      message: "form error!",
    };
  } else {
    const response = await Category.create(data).then((result, error) => {
      if (result) {
        return {
          errCode: 0,
          message: "success",
          data: result,
        };
      } else {
        return {
          errCode: 1,
          message: "error",
          data: error,
        };
      }
    });
    return response;
  }
};

const CategoryServices = {
  handleCreateCategory,
};

export default CategoryServices;
