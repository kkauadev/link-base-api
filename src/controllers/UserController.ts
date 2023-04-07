import { Request, Response } from "express";
import { userRepository } from "../repositories";
import { CreateService } from "../services/CreateService";

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await userRepository().find({
        relations: ["folders", "folders.links"],
      });
      return res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await userRepository().findOne({
        where: { id },
        relations: ["folders", "folders.links"],
      });

      if (!result) {
        return res.status(404).json({ erro: "there is no user with this id" });
      }

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }

  async create(req: Request, res: Response) {
    const createService = new CreateService();

    if (!req.body.name) {
      return new Error("there is missing data");
    }
    await createService.user({ name: req.body.name });

    return res.json({ message: "created user", data: req.body });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await userRepository().update(id, { name });

      return res.json({ data: req.body });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await userRepository().findOneBy({ id });

    const removedUser = await userRepository().remove(user);

    res.json({ removed: removedUser });
  }
}
