import { Request, Response } from "express";
export class LogoutController {
  deleteToken(req: Request, res: Response) {
    res.json({ auth: false, token: null });
  }
}
