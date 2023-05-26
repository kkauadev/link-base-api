import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";
import { CreateUserData, UpdateUserData } from "../types/user";
import { userRepository } from "../repositories";
import { AppDataSource } from "../data-source";
import { User } from "../entities/UserEntity";

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const readService = new ReadService();
      const result = await readService.allUser();

      return res.status(200).json({ result });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const readService = new ReadService();
      const result = await readService.oneUser(id);

      if (!result) {
        throw new Error("there is no user with this id");
      }

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async create(req: Request<any, any, CreateUserData>, res: Response) {
    try {
      const { password, name } = req.body;

      if (!password || !name) {
        return res.status(400).json({
          error: "Missing required fields",
          format: { name: "string", password: "string" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createService = new CreateService();

      const userCreated = await createService.user({
        name,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json({ message: "created user", data: userCreated });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async update(
    req: Request<{ id: string }, any, UpdateUserData>,
    res: Response
  ) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          error: "Missing required fields",
          format: { name: "string" },
        });
      }

      const updateService = new UpdateService();
      const updatedData = await updateService.user(id, req.body);

      return res.json({ message: "User updated", data: updatedData });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deleteService = new DeleteService();
      const deletedUser = await deleteService.user(id);

      res.json({ deleted: "success", data: deletedUser });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }
}
