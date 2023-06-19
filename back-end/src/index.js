import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import routers from "./routers/index.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());

routers(app);

app.get("/", (req, res) => {
  return res.send("App is running...");
});

const port = 3030;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
