import { NextFunction, Request, Response } from "express";
import { FolderDTO } from "../dtos";
import Error from "../helpers/api-errors";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";

export class FolderController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const { user_id: userId } = req.params;

    if (!userId || userId.length != 36) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const readService = new ReadService();
    const result = await readService.allFolders(userId);

    if (!result) {
      return next(new Error.NotFound("don't exists any folder"));
    }

    return res.json({ ...result });
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id || id.length != 36) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const readService = new ReadService();
    const result = await readService.oneFolder(id);

    if (!result) {
      return next(new Error.NotFound("don't exists any folder"));
    }

    return res.json({ ...result });
  }

  async create(
    req: Request<{ user_id: string }, any, FolderDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { user_id: userId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const createService = new CreateService();
    const createdFolder = await createService.folder(userId, {
      name,
      description,
    });

    return res.json({ ...createdFolder });
  }

  async update(
    req: Request<{ id: string }, any, FolderDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return next(new Error.BadRequest("some mandatory data was not passed"));
    }

    const updateService = new UpdateService();
    const updatedFolder = await updateService.folder(id, {
      name,
      description,
    });

    return res.json({ ...updatedFolder });
  }

  async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;

    const deleteService = new DeleteService();
    const deletedFolder = await deleteService.folder(id);

    return res.json({ ...deletedFolder });
  }
}
