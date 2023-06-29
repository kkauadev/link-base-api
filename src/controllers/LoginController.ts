import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export class LoginController {
  async getToken(
    req: Request<any, any, { username: string; password: string }>,
    res: Response
  ) {
    try {
      const { username, password } = req.body;
      console.log(req.body);

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

      if (!process.env.JWT_SECRET_KEY) return res.sendStatus(500);

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 30000,
      });
      return res.json({ auth: true, token, id: user.id });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "unknown error";
      return res.status(401).json({ erro: errorMessage });
    }
  }

  async verifyToken(req: Request, res: Response) {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).json({
        erro: "token is missing",
      });
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
