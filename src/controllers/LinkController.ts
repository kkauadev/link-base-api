import { Request, Response } from "express";
import { TypeORMError } from "typeorm";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";
import { CreateLinkData, UpdateLinkData } from "../types/link";

export class LinkController {
  async getAll(req: Request<{ folder_id: string }>, res: Response) {
    try {
      const { folder_id: id } = req.params;

      const readService = new ReadService();
      const result = await readService.oneUser(id);

      res.json({ result });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async getOne(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const readService = new ReadService();
      const result = await readService.oneUser(id);

      res.json({ result });
    } catch (err) {
      if (err instanceof TypeORMError) {
        console.log("Typeorm error");
      }
      return res.status(400).json({ erro: err });
    }
  }

  async create(
    req: Request<{ folder_id: string }, any, CreateLinkData>,
    res: Response
  ) {
    try {
      const { folder_id } = req.params;
      const { title, description, link } = req.body;

      if (!title || !description || !link) {
        return res.status(400).json({
          error: "some mandatory data was not passed",
          format: { title: "string", description: "string", link: "string" },
        });
      }

      const createService = new CreateService();
      const createdUser = await createService.link(folder_id, {
        title,
        description,
        link,
      });

      res.json({ createdUser });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deleteService = new DeleteService();
      const deletedLink = await deleteService.link(id);

      res.json(deletedLink);
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async update(
    req: Request<{ id: string }, any, UpdateLinkData>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { title, description, link } = req.body;

      if (!title && !description && !link) {
        return res.json({
          error: "missing data to update",
          format: { title: "string", description: "string", link: "string" },
        });
      }

      const updateService = new UpdateService();
      const updatedLink = await updateService.link(id, {
        title,
        description,
        link,
      });

      return res.json({ updatedLink });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }
}
