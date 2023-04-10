import { Optional } from ".";
import { User } from "../entities/UserEntity";

export type CreateUserData = Optional<
  Omit<User, "updatedDate" | "createDate" | "folders" | "id">
>;

export type UpdateUserData = Optional<
  Omit<User, "updatedDate" | "createDate" | "folders" | "id">
>;
