import { Request, Response } from "express";
import { folderRepository } from "../repositories";
import { CreateService } from "../services/CreateService";

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
    const { id, data } = req.body;
    const createService = new CreateService();

    const createdFolder = await createService.folder(id, data);

    res.json(createdFolder);
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
