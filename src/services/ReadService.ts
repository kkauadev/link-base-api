import { Folder } from "../entities/FolderEntity";
import { Link } from "../entities/LinkEntity";
import { User } from "../entities/UserEntity";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

export class ReadService {
  async oneUser(userId: string): Promise<User | null> {
    try {
      const data = await userRepository().findOne({
        where: { id: userId },
        relations: ["folders", "folders.links"],
      });
      return data;
    } catch (err) {
      return null;
    }
  }

  async userExists(username: string): Promise<boolean> {
    const data = await userRepository().findOne({
      where: { name: username },
    });

    return !!data;
  }

  async oneUserWithName(username: string): Promise<User | null> {
    const data = await userRepository().findOne({
      where: { name: username },
    });

    return data;
  }

  async oneFolder(folderId: string): Promise<Folder | null> {
    const data = await folderRepository().findOne({
      where: { id: folderId },
      relations: ["links"],
    });

    return data;
  }

  async oneLink(linkId: string): Promise<Link | null> {
    const data = await linkRepository().findOneBy({ id: linkId });

    return data;
  }

  async allUser(): Promise<User[] | null> {
    const data = userRepository().find({
      relations: ["folders", "folders.links"],
    });

    return data;
  }
  async allFolders(userId: string): Promise<Folder[] | null> {
    const data = await folderRepository().find({
      relations: ["links"],
      where: { user: { id: userId } },
    });

    return data;
  }
  async allLinks(linkId: string): Promise<Link[] | null> {
    const data = linkRepository().findBy({ folder: { id: linkId } });

    return data;
  }
}
