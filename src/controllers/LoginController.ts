import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories";
import bcrypt from "bcrypt";

export class LoginController {
  async getToken(
    req: Request<any, any, { username: string; password: string }>,
    res: Response
  ) {
    try {
      const user = await userRepository().findOneBy({
        name: req.body.username,
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(
        user.password,
        req.body.password
      );

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 30000,
      });
      return res.json({ auth: true, token, id: user.id });
    } catch (err) {
      return res.status(401).end();
    }
  }
}
