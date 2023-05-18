import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  url: process.env.DATABASE_URL ?? undefined,
  type: "postgres",
  username: "link_base_pg_user",
  password: "oCVBkce4udRRzDd23DQN60MbBGYIrJi7",
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts", "build/entities/*.js"],
  migrations: ["src/migration/*.ts", "build/migration/*.js"],
});
