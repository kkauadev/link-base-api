import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { verifyAuthentication } from "../middlewares/authenticated";

const router = Router();

const user = new UserController();

router.get("/user", verifyAuthentication(), user.getAll);

router.get("/user/:id", verifyAuthentication(), user.getOne);

router.post("/user/create", user.create);

router.put("/user/update/:id", verifyAuthentication(), user.update);

router.delete("/user/delete/:id", verifyAuthentication(), user.delete);

router.post("/user/bio/:id", verifyAuthentication(), user.createBio);

router.patch("/user/bio/:id", verifyAuthentication(), user.updateBio);

export const userRoutes = router;
