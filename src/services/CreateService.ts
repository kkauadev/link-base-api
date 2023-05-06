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
  async user(data: CreateUserData): Promise<User> {
    const newUser = userRepository().create({ ...data });
    await userRepository().save(newUser);

    return newUser;
  }

  async folder(userId: string, data: CreateFolderData): Promise<Folder> {
    try {
      const createdFolder = folderRepository().create({
        ...data,
        user: {
          id: userId,
        },
      });
      await folderRepository().save(createdFolder);
      return createdFolder;
    } catch (err) {
      throw new Error("erro on save data, please repeat again");
    }
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
