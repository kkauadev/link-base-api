import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import { folderRouter } from "./routers/folder";
import { linkRouter } from "./routers/link";
import { userRoutes } from "./routers/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(userRoutes);
app.use(folderRouter);
app.use(linkRouter);

AppDataSource.initialize().then(() => console.log("Connect to database"));

app.listen(process.env.PORT_SERVER, () =>
  console.log("running on port " + process.env.PORT_SERVER)
);
