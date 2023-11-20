import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorMessages, userErrorMessages } from "../constants/error-messages";
import { UserDTO } from "../dtos";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const readService = new ReadService();
      const result = await readService.allUser();

      return res.status(StatusCodes.OK).json({ ...result });
    } catch (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ erro: userErrorMessages.BAD_REQUEST });
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

      return res.json({ ...result });
    } catch (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ erro: userErrorMessages.BAD_REQUEST });
    }
  }

  async create(req: Request<any, any, UserDTO>, res: Response) {
    try {
      const { username, password, email, name } = req.body;

      if (!username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: errorMessages.MISSING_REQUIRED_FIELDS,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const readService = new ReadService();
      const usersExists = await readService.userExists(username);

      if (usersExists) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: userErrorMessages.USER_ALREADY_EXISTS });
      }

      const createService = new CreateService();

      const userCreated = await createService.user({
        username,
        password: hashedPassword,
        email,
        name,
      });

      return res
        .status(StatusCodes.CREATED)
        .json({ message: "created user", data: userCreated });
    } catch (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: userErrorMessages.BAD_REQUEST });
    }
  }

  async update(req: Request<{ id: string }, any, UserDTO>, res: Response) {
    try {
      const { id } = req.params;
      const { username } = req.body;

      if (!username) {
        return res.status(400).json({
          error: "Missing required fields",
          format: { name: "string" },
        });
      }

      const updateService = new UpdateService();
      const updatedData = await updateService.user(id, req.body);

      return res.json({ ...updatedData });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    try {
      const { id } = req.params;

      const deleteService = new DeleteService();
      const deletedUser = await deleteService.user(id);

      res.json({ ...deletedUser });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async createBio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { bio } = req.body;

      const createService = new CreateService();
      const createdBio = await createService.bio(id, bio);

      return res.json({ data: createdBio });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }

  async updateBio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { bio } = req.body;

      const updateService = new UpdateService();
      const updatedData = await updateService.bio(id, bio);

      return res.json({ data: updatedData });
    } catch (err) {
      return res.status(400).json({ erro: err });
    }
  }
}
