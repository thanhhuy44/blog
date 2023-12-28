import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import routers from "./routers";
import B2 from "backblaze-b2";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

const uri = process.env.DB_URL;
export const b2 = new B2({
  applicationKeyId: "4e127fa4ad4d", // or accountId: 'accountId'
  applicationKey: "005e223c930ac68bb1bd3545f72c67be1146e41e35", // or masterApplicationKey
});

const connectDB = async () => {
  try {
    await mongoose.connect(uri as string, {});
    console.log("Çonnected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.use(fileUpload());

app.get("/", (req: Request, res: Response) => {
  return res.send("App is running");
});

connectDB();

b2.authorize();

routers(app);

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
});
