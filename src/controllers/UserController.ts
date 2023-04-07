import { Request, Response } from "express";
import { userRepository } from "../repositories";
import { CreateService } from "../services/CreateService";

export class UserController {
  async getAll(res: Response) {
    try {
      const data = await userRepository().find({
        relations: ["folders", "folders.links"],
      });
      return res.json({ status: "success", data });
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await userRepository().findOneBy({ id });

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

    const createdUser = createService.user(req.body.name);

    return res.json({ "Created user": createdUser });
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username } = req.body;

      const updatedUser = await userRepository().update(id, { name: username });

      if (!updatedUser) {
        console.log(updatedUser);
      }

      return res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await userRepository().findOneBy({ id });

      const removedUser = await userRepository().remove(user);

      res.json({ "removed-user": removedUser });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
