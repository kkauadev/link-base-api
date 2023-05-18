import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL ?? undefined,
  type: "postgres",
  host: process.env.HOST_DB,
  port: 5432,
  username: "link_base_pg_user",
  password: process.env.PASSWORD_DB,
  database: "link_base_pg",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts", "build/entities/*.js"],
  migrations: ["src/migration/*.ts", "build/migration/*.js"],
});
