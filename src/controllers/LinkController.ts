import { NextFunction, Request, Response } from "express";
import { LinkDTO } from "../dtos";
import Error from "../helpers/api-errors";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";

export class LinkController {
  async getAll(req: Request<{ folder_id: string }>, res: Response) {
    const { folder_id: id } = req.params;

    const readService = new ReadService();
    const result = await readService.oneUser(id);

    res.json({ ...result });
  }

  async getOne(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const readService = new ReadService();
    const result = await readService.oneLink(id);

    return res.json({ ...result });
  }

  async create(
    req: Request<{ folder_id: string }, any, LinkDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { folder_id } = req.params;
    const { title, description, link } = req.body;

    if (!title || !description || !link) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const createService = new CreateService();
    const createdUser = await createService.link(folder_id, {
      title,
      description,
      link,
    });

    res.json({ ...createdUser });
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const deleteService = new DeleteService();
    const deletedLink = await deleteService.link(id);

    res.json({ deletedLink });
  }

  async update(
    req: Request<{ id: string }, any, LinkDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { title, description, link } = req.body;

    if (!title && !description && !link) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const updateService = new UpdateService();
    const updatedLink = await updateService.link(id, {
      title,
      description,
      link,
    });

    return res.json({ ...updatedLink });
  }
}
