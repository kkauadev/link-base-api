import { Request, Response } from "express";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";
import { CreateFolderData, UpdateFolderData } from "../types/folder";

export class FolderController {
  async getAll(req: Request, res: Response) {
    try {
      const { user_id: userId } = req.params;

      if (!userId || userId.length != 36) {
        throw new Error("some mandatory data was not passed");
      }

      const readService = new ReadService();
      const result = readService.allFolders(userId);

      if (!result) throw new Error("don't exists any folder");

      return res.json({ result });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { user_id: userId, id } = req.params;

      if (!userId || !id || userId.length != 36 || id.length != 36) {
        throw new Error("some mandatory data was not passed");
      }

      const readService = new ReadService();
      const result = await readService.oneFolder(id, userId);

      if (!result) {
        throw new Error("there is no folder with this id");
      }

      return res.json({ result });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async create(
    req: Request<{ user_id: string }, any, CreateFolderData>,
    res: Response
  ) {
    try {
      const { user_id: userId } = req.params;
      const data = req.body;

      if (!userId || userId.length != 36 || !data) {
        throw new Error("some mandatory data was not passed");
      }

      const createService = new CreateService();
      const createdFolder = await createService.folder(userId, data);

      res.json(createdFolder);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async update(
    req: Request<{ user_id: string; id: string }, any, UpdateFolderData>,
    res: Response
  ) {
    try {
      const { user_id: userId, id } = req.params;
      const data = req.body;

      if (!userId || userId.length != 36 || !id || id.length != 36 || !data) {
        throw new Error("some mandatory data was not passed");
      }

      const updateService = new UpdateService();
      const updatedFolder = await updateService.folder(userId, id, data);

      res.json({ updatedFolder });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deleteService = new DeleteService();
      const deletedFolder = await deleteService.folder(id);

      return res.json({ deleted: "success", data: deletedFolder });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }
}
