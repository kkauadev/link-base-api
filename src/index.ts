import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import router from "./routers/user";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(router);

AppDataSource.initialize().then(() => console.log("running"));
app.listen(process.env.PORT_SERVER, () =>
  console.log("running on port " + process.env.PORT_SERVER)
);
