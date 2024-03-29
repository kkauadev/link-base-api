import dotenv from "dotenv";
import { User } from "./entities/UserEntity";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Folder } from "./entities/FolderEntity";
import { Link } from "./entities/LinkEntity";

dotenv.config();

const environment = process.env.ENVIRONMENT;

const options: DataSourceOptions =
  environment === "production"
    ? {
        type: "postgres",
        host: process.env.DB_HOST,
        url: process.env.DB_URL,
        port: 5432,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [User, Folder, Link],
      }
    : {
        type: "postgres",
        host: "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.USERNAME_DB || "postgres",
        password: process.env.PASSWORD_DB || "postgres",
        database: process.env.DB_NAME || "link-base",
        synchronize: true,
        entities: [User, Folder, Link],
      };

export const AppDataSource = new DataSource(options);
