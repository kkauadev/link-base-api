import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PORT),
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: "link-base",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: [],
  subscribers: [],
});
