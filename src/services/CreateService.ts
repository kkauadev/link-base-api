import { Folder } from "../entities/Folder";
import { Link } from "../entities/Link";
import { User } from "../entities/User";
import {
  folderRepository,
  linkRepository,
  userRepository,
} from "../repositories";

type Optional<Type> = { [Property in keyof Type]+?: Type[Property] };

export class CreateService {
  async user(data: Optional<User>) {
    const newUser = userRepository().create({
      name: data.name,
    });
    await userRepository().save(newUser);
    return newUser;
  }

  async folder(userId: string, data: Optional<Folder>) {
    const createdFolder = folderRepository().create({
      description: data.description,
      links: data.links,
      name: data.name,
      user: {
        id: userId,
      },
    });

    await folderRepository().save(createdFolder);

    return createdFolder;
  }

  async link(folderId: string, data: Optional<Link>) {
    const createdLink = linkRepository().create({
      title: data.title,
      link: data.link,
      description: data.description,
      folder: {
        id: folderId,
      },
    });

    await linkRepository().save(createdLink);

    return createdLink;
  }
}
