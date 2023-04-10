import { Optional } from ".";
import { Folder } from "../entities/FolderEntity";

export type CreateFolderData = Optional<
  Omit<Folder, "createDate" | "updatedDate" | "links" | "user" | "id">
>;

export type UpdateFolderData = Optional<
  Omit<Folder, "createDate" | "updatedDate" | "links" | "user" | "id">
>;
