import { Folder } from "../entities/FolderEntity";
import { Link } from "../entities/LinkEntity";
import { User } from "../entities/UserEntity";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

export class ReadService {
  async oneUser(userId: string): Promise<User | undefined> {
    const data = await userRepository().findOne({
      where: { id: userId },
      relations: ["folders", "folders.links"],
    });

    return data;
  }

  async oneFolder(
    folderId: string,
    userId: string
  ): Promise<Folder | undefined> {
    const data = await folderRepository().findOne({
      where: { id: folderId, user: { id: userId } },
      relations: ["links"],
    });

    return data;
  }

  async oneLink(linkId: string): Promise<Link | undefined> {
    const data = await linkRepository().findOneBy({ id: linkId });

    return data;
  }

  async allUser(): Promise<User[] | undefined> {
    const data = userRepository().find({
      relations: ["folders", "folders.links"],
    });

    return data;
  }
  async allFolders(userId: string): Promise<Folder[] | undefined> {
    const data = await folderRepository().find({
      relations: ["links"],
      where: { user: { id: userId } },
    });

    return data;
  }
  async allLinks(linkId: string): Promise<Link[] | undefined> {
    const data = linkRepository().findBy({ folder: { id: linkId } });

    return data;
  }
}
