import mongoose from "mongoose";
import Category, { ICategory } from "../models/category";

interface ResponseType {
  errCode: number;
  message: string;
  data: ICategory | ICategory[] | null;
}

const create = async (data: { name: string; desdescription: string }) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!data.name || data.desdescription) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const existCategory = await Category.find({ name: data.name });
        if (existCategory.length) {
          resolve({
            errCode: 1,
            message: "category is exist!",
            data: null,
          });
        } else {
          const newCategory = await Category.create(data);
          if (newCategory) {
            resolve({
              errCode: 0,
              message: "success!",
              data: newCategory,
            });
          } else {
            resolve({
              errCode: 1,
              message: "error!",
              data: null,
            });
          }
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const getAll = async () => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      const categories = await Category.find({});
      if (categories.length) {
        resolve({
          errCode: 0,
          message: "success!",
          data: categories,
        });
      } else {
        resolve({
          errCode: 1,
          message: "haven't category!",
          data: categories,
        });
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const getDetail = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const category = await Category.findById(id);
        if (category) {
          resolve({
            errCode: 0,
            message: "success!",
            data: category,
          });
        } else {
          resolve({
            errCode: 1,
            message: "category not found!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const update = async (
  id: string,
  body?: {
    name: string;
    description: string;
  }
) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        (body && !body.name && !body?.description)
      ) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const updatedCategory = await Category.findByIdAndUpdate(id, body);
        if (updatedCategory) {
          resolve({
            errCode: 0,
            message: "success!",
            data: updatedCategory,
          });
        } else {
          resolve({
            errCode: 1,
            message: "category not found!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const remove = async (id: string) => {
  return new Promise<ResponseType>(async (resolve, reject) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        resolve({
          errCode: 1,
          message: "form error!",
          data: null,
        });
      } else {
        const removedCategory = await Category.findByIdAndDelete(id);
        if (removedCategory) {
          resolve({
            errCode: 0,
            message: "success!",
            data: removedCategory,
          });
        } else {
          resolve({
            errCode: 1,
            message: "category not found!",
            data: null,
          });
        }
      }
    } catch (error) {
      resolve({
        errCode: 1,
        message: "error!",
        data: null,
      });
    }
  });
};

const CategoryServices = {
  create,
  getAll,
  getDetail,
  update,
  remove,
};

export default CategoryServices;
