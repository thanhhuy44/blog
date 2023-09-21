import express, { Express, Request, Response, Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routers";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3030;

const databaseURL: string | undefined = process.env.DB_URL;

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

routers(app);

app.get("/", (req: Request, res: Response) => {
  return res.send("App is running");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
