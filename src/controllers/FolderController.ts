import { Request, Response } from "express";
import { folderRepository } from "../repositories";

export class FolderController {
  async getAll(req: Request, res: Response) {
    const { id } = req.params;

    const folders = await folderRepository().find({
      relations: ["links"],
      where: { user: { id: id } },
    });

    if (!folders) {
      return res.send(401).json({
        erro: "don't exists any folder",
      });
    }

    return res.json({ folders });
  }

  async getOne(req: Request, res: Response) {
    const { user_id, id } = req.params;
    console.log(id);

    const folder = await folderRepository().findOneBy({
      user: {
        id: user_id,
      },
      id,
    });

    return res.json({ folder });
  }

  async create(req: Request, res: Response) {
    try {
      const { id, data } = req.body;

      const createdFolder = folderRepository().create({
        description: data.description,
        links: data.links,
        name: data.name,
        user: id,
      });

      await folderRepository().save(createdFolder);

      res.json(createdFolder);
    } catch (err) {
      console.log(err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { user_id, id } = req.params;
      const { data } = req.body;

      const updatedFolder = await folderRepository().update(
        { user: { id: user_id }, id },
        data
      );
      res.json({ updatedFolder });
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { user_id, id } = req.params;
      const folder = await folderRepository().findOneBy({
        user: { id: user_id },
        id,
      });

      await folderRepository().delete(folder);
    } catch (err) {}
  }
}
