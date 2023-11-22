import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Error from "../helpers/api-errors";
import { userRepository } from "../repositories";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export class LoginController {
  async getToken(
    req: Request<any, any, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    const expiresInOneWeek = "1w";

    const { username, password } = req.body;

    if (!username || !password) {
      return next(new Error.BadRequest("Missing required fields"));
    }

    const user = await userRepository().findOne({
      where: {
        name: username,
      },
    });

    if (user === null) {
      return next(new Error.Unauthorized("Invalid credentials"));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return next(new Error.Unauthorized("Invalid credentials"));
    }

    if (!process.env.JWT_SECRET_KEY) {
      return next(new Error.Unauthorized("Internal server error"));
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresInOneWeek,
    });
    return res.json({ auth: true, token, id: user.id });
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return next(new Error.Unauthorized("token is missing"));
    }

    const [, token] = authHeaders.split(" ");

    try {
      if (!process.env.JWT_SECRET_KEY) return res.sendStatus(500);
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { id } = data as TokenPayload;
      req.params.userId = id;

      return res.sendStatus(200);
    } catch (err) {
      return res.sendStatus(401);
    }
  }
}
