import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

dotenv.config();

export const verifyAuthentication = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      return res.status(401).json({
        erro: "token is missing",
      });
    }

    const [, token] = authHeaders.split(" ");

    try {
      if (!process.env.JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined");
      }
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { id } = data as TokenPayload;
      req.params.userId = id;
      return next();
    } catch (err) {
      return res.sendStatus(401);
    }
  };
};
