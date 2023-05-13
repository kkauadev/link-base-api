import { Request, Response } from "express";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";
import { CreateFolderData, UpdateFolderData } from "../types/folder";
import { createFolderSchema } from "../schemas/UserSchema";

export class FolderController {
  async getAll(req: Request, res: Response) {
    try {
      const { user_id: userId } = req.params;

      if (!userId || userId.length != 36) {
        throw new Error("some mandatory data was not passed");
      }

      const readService = new ReadService();
      const result = await readService.allFolders(userId);

      if (!result) throw new Error("don't exists any folder");

      return res.json({ result });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id || id.length != 36) {
        return res
          .status(400)
          .json({ error: "some mandatory data was not passed" });
      }

      const readService = new ReadService();
      const result = await readService.oneFolder(id);

      if (!result) {
        throw new Error("there is no folder with this id");
      }

      return res.json({ ...result });
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
      const { name, description } = createFolderSchema.parse(req.body);

      const createService = new CreateService();
      const createdFolder = await createService.folder(userId, {
        name,
        description,
      });

      return res.json(createdFolder);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async update(
    req: Request<{ id: string }, any, UpdateFolderData>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { name, description } = createFolderSchema.parse(req.body);

      const updateService = new UpdateService();
      const updatedFolder = await updateService.folder(id, {
        name,
        description,
      });

      return res.json({ updatedFolder });
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
