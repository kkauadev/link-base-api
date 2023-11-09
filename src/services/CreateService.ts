import { FolderDTO, LinkDTO, UserDTO } from "../dtos";
import { Folder } from "../entities/FolderEntity";
import { Link } from "../entities/LinkEntity";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

export class CreateService {
  async user(data: UserDTO): Promise<UserDTO> {
    try {
      const existUser = await userRepository().findOneBy({
        name: data.username,
      });

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

  async folder(userId: string, data: FolderDTO): Promise<Folder> {
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

  async link(folderId: string, data: LinkDTO): Promise<Link> {
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
