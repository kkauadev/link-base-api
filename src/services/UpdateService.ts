import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";
import { UpdateFolderData } from "../types/folder";
import { UpdateLinkData } from "../types/link";
import { UpdateUserData } from "../types/user";

export class UpdateService {
  async user(
    userId: string,
    data: UpdateUserData
  ): Promise<UpdateUserData | undefined> {
    await userRepository().update({ id: userId }, data);

    return data;
  }

  async folder(
    userId: string,
    folderId: string,
    data: UpdateFolderData
  ): Promise<UpdateFolderData | undefined> {
    await folderRepository().update(
      { user: { id: userId }, id: folderId },
      data
    );
    return data;
  }

  async link(
    linkId: string,
    data: UpdateLinkData
  ): Promise<UpdateLinkData | undefined> {
    await linkRepository().update({ id: linkId }, data);
    return data;
  }
}
