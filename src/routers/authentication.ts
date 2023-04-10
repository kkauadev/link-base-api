import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { LogoutController } from "../controllers/LogoutController";

const router = Router();

router.post("/login", new LoginController().getToken);

router.post("/logout", new LogoutController().deleteToken);
