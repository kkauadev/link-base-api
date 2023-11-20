import { UserDTO, FolderDTO, LinkDTO } from "../dtos";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

export class UpdateService {
  async user(userId: string, data: UserDTO): Promise<UserDTO | undefined> {
    await userRepository().update({ id: userId }, data);

    return data;
  }

  async bio(userId: string, data: string): Promise<string | undefined> {
    await userRepository().update({ id: userId }, { bio: data });

    return data;
  }

  async folder(
    folderId: string,
    data: FolderDTO
  ): Promise<FolderDTO | undefined> {
    await folderRepository().update({ id: folderId }, data);
    return data;
  }

  async link(linkId: string, data: LinkDTO): Promise<LinkDTO | undefined> {
    await linkRepository().update({ id: linkId }, data);
    return data;
  }
}
