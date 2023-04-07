import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();

const user = new UserController();

router.get("/users", user.getAll);

router.get("/users/:id", user.getOne);

router.post("/user/create", user.create);

router.put("/user/update/:id", user.update);

router.delete("/user/delete/:id", user.delete);

export const userRoutes = router;
