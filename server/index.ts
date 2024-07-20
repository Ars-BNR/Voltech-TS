import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import errorMiddleware from "./middlewares/error-middleware";
import { initializeData } from "./db";
import router from "./routers/index";

const PORT = process.env.PORT || 9375;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(morgan("dev"));
app.use(express.static("img"));
app.use(fileUpload({ createParentPath: true }));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    initializeData();
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT =  ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
