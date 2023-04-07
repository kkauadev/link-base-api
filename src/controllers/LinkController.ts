import { Request, Response } from "express";
import { linkRepository } from "../repositories";

export class LinkController {
  async getAll(req: Request, res: Response) {
    const { folder_id: folderId } = req.params;

    const links = linkRepository().findBy({ folder: { id: folderId } });

    res.json({ links });
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    const link = linkRepository().findOneBy({ id });

    res.json({ link });
  }

  async create(req: Request, res: Response) {
    const { folder_id } = req.params;
    const { data } = req.body;

    const link = await linkRepository().findOneBy({ id: data.id });

    if (link) {
      return res.status(401).json({ erro: "link already exists" });
    }

    const createdLink = await linkRepository().create({
      description: data.description,
      link: data.link,
      title: data.title,
      folder: { id: folder_id },
    });

    await linkRepository().save(createdLink);

    res.json({ createdLink });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const link = await linkRepository().findOneBy({ id });

    const removedLink = await linkRepository().remove(link);

    res.json(removedLink);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { data } = req.body;

    const updatedLink = await linkRepository().update(id, data);

    return res.json(updatedLink);
  }
}
