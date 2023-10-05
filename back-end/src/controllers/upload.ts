import { Request, Response } from "express";
import UploadService from "../services/upload";
import { UploadedFile } from "express-fileupload";

const upload = async (req: Request, res: Response) => {
  const data = await UploadService.upload(req?.files?.file as UploadedFile);
  return res.status(200).json(data);
};

const UploadController = {
  upload,
};

export default UploadController;
