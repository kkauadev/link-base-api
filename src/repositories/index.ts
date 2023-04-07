import { AppDataSource } from "../data-source";
import { Folder } from "../entities/Folder";
import { Link } from "../entities/Link";
import { User } from "../entities/User";

export const userRepository = () => {
  return AppDataSource.getRepository(User);
};

export const folderRepository = () => {
  return AppDataSource.getRepository(Folder);
};

export const linkRepository = () => {
  return AppDataSource.getRepository(Link);
};
