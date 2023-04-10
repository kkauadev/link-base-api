import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories";

export class LoginController {
  async getToken(
    req: Request<any, any, { user: string; password: string }>,
    res: Response
  ) {
    const { id } = await userRepository().findOneBy({
      name: req.body.user,
      password: req.body.password,
    });

    if (!id) {
      return;
    }

    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 30000,
    });

    return res.json({ auth: true, token });
  }
}
