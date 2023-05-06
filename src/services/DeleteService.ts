import { Folder } from "../entities/FolderEntity";
import { Link } from "../entities/LinkEntity";
import { User } from "../entities/UserEntity";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

export class DeleteService {
  async user(userId: string): Promise<User | Error> {
    const user = await userRepository().findOneBy({ id: userId });

    if (!user) {
      return new Error("User don't exist");
    }

    await userRepository().delete({ id: userId, folders: user.folders });

    return user;
  }

  async folder(folderId: string): Promise<Folder | Error> {
    const folder = await folderRepository().findOneBy({
      id: folderId,
    });

    if (!folder) {
      return new Error("Folder don't exist");
    }

    await folderRepository().delete({ id: folderId });

    return folder;
  }

  async link(linkId: string): Promise<string | Error> {
    const link = await linkRepository().findOneBy({
      id: linkId,
    });

    if (!link) {
      return new Error("Link don't exist");
    }

    await linkRepository().delete({ id: linkId });

    return linkId;
  }
}
