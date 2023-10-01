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
const databaseURL: string | undefined = process.env.DB_URL;

export const b2 = new B2({
  applicationKeyId: "4e127fa4ad4d", // or accountId: 'accountId'
  applicationKey: "005e223c930ac68bb1bd3545f72c67be1146e41e35", // or masterApplicationKey
});

if (databaseURL) {
  mongoose.connect(databaseURL, {});
}

app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.41:3000"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());
app.use(fileUpload());

routers(app);

app.get("/", (req: Request, res: Response) => {
  return res.send("App is running");
});

app.listen(port, async () => {
  await b2.authorize();
  console.log(`Server is running at http://localhost:${port}`);
});
