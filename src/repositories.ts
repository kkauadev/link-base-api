import { AppDataSource } from "./data-source";
import { Folder } from "./entities/FolderEntity";
import { Link } from "./entities/LinkEntity";
import { User } from "./entities/UserEntity";

export const userRepository = () => {
  return AppDataSource.getRepository(User);
};

export const folderRepository = () => {
  return AppDataSource.getRepository(Folder);
};

export const linkRepository = () => {
  return AppDataSource.getRepository(Link);
};
