import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories";

export class LoginController {
  async getToken(
    req: Request<any, any, { username: string; password: string }>,
    res: Response
  ) {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(401).json({
          error: "A value is missing",
          auth: false,
          format: { username: "string", password: "string" },
        });

      const user = await userRepository().findOne({
        where: {
          name: username,
        },
      });

      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
          auth: false,
          format: { username: "string", password: "string" },
          data: { username, password },
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentialsaa" });
      }
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY not found in .env file");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 30000,
      });
      return res.json({ auth: true, token, id: user.id });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "unknown error";
      return res.status(401).json({ erro: errorMessage });
    }
  }
}
