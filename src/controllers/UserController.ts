import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserDTO } from "../dtos";
import Error from "../helpers/api-errors";
import { CreateService } from "../services/CreateService";
import { DeleteService } from "../services/DeleteService";
import { ReadService } from "../services/ReadService";
import { UpdateService } from "../services/UpdateService";

export class UserController {
  async getAll(req: Request, res: Response) {
    const readService = new ReadService();
    const result = await readService.allUser();

    return res.status(StatusCodes.OK).json({ ...result });
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const readService = new ReadService();
    const result = await readService.oneUser(id);

    if (!result) {
      return next(new Error.NotFound("There is no user with this id"));
    }

    return res.status(StatusCodes.OK).json({ ...result });
  }

  async create(
    req: Request<any, any, UserDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { username, password, email, name } = req.body;

    if (!username || !password) {
      return next(new Error.BadRequest("Missing required fields"));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const readService = new ReadService();
    const usersExists = await readService.userExists(username);

    if (usersExists) {
      return next(new Error.Conflict("User already exists"));
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
  }

  async update(
    req: Request<{ id: string }, any, UserDTO>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return next(new Error.BadRequest("Missing required fields"));
    }

    const updateService = new UpdateService();
    const updatedData = await updateService.user(id, req.body);

    return res.json({ ...updatedData });
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const deleteService = new DeleteService();
    const deletedUser = await deleteService.user(id);

    res.json({ ...deletedUser });
  }

  async createBio(req: Request, res: Response) {
    const { id } = req.params;
    const { bio } = req.body;

    const createService = new CreateService();
    const createdBio = await createService.bio(id, bio);

    return res.json({ data: createdBio });
  }

  async updateBio(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { bio } = req.body;

    if (!bio) {
      return next(new Error.BadRequest("Missing required fields"));
    }

    const updateService = new UpdateService();
    const updatedData = await updateService.bio(id, bio);

    return res.json({ data: updatedData });
  }
}
