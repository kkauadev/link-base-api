import { Folder } from "../entities/FolderEntity";
import { Link } from "../entities/LinkEntity";
import { User } from "../entities/UserEntity";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";
import { CreateFolderData } from "../types/folder";
import { CreateLinkData } from "../types/link";
import { CreateUserData } from "../types/user";

export class CreateService {
  async user(data: CreateUserData): Promise<CreateUserData> {
    try {
      const existUser = await userRepository().findOneBy({ name: data.name });

      if (existUser) {
        throw new Error("user already exists");
      }

      const createdUser = userRepository().create({ ...data });
      await userRepository().save(createdUser);

      return data;
    } catch (err) {
      throw new Error("erro on save data, please repeat again");
    }
  }

  async folder(userId: string, data: CreateFolderData): Promise<Folder> {
    const createdFolder = folderRepository().create({
      ...data,
      user: {
        id: userId,
      },
    });

    try {
      await folderRepository().save(createdFolder);
    } catch (err) {
      throw new Error("erro on save data, please repeat again");
    }

    return createdFolder;
  }

  async link(folderId: string, data: CreateLinkData): Promise<Link> {
    const createdLink = linkRepository().create({
      ...data,
      folder: {
        id: folderId,
      },
    });

    try {
      await linkRepository().save(createdLink);
    } catch (err) {
      throw new Error("erro on save data, please repeat again");
    }

    return createdLink;
  }
}
