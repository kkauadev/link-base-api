import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./data-source";
import { authenticationRouter } from "./routers/authentication";
import { folderRouter } from "./routers/folder";
import { linkRouter } from "./routers/link";
import { userRoutes } from "./routers/user";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(authenticationRouter);
app.use(userRoutes);
app.use(folderRouter);
app.use(linkRouter);

const connect = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connect to database");
  } catch (error) {
    console.log(error);
    console.log("error connecting to database");
  }
};

connect();

app.listen(process.env.PORT_SERVER || 3333, () =>
  console.log("running on port " + process.env.PORT_SERVER || 3333)
);
