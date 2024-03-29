import { Router } from "express";
import { FolderController } from "../controllers/FolderController";
import { verifyAuthentication } from "../middlewares/authenticated";

const router = Router();

const folderController = new FolderController();

router.get(
  "/folders/:user_id",
  verifyAuthentication(),
  folderController.getAll
);

router.get("/folder/:id", verifyAuthentication(), folderController.getOne);

router.post(
  "/folders/create/:user_id",
  verifyAuthentication(),
  folderController.create
);

router.put(
  "/folders/update/:id",
  verifyAuthentication(),
  folderController.update
);

router.delete(
  "/folders/delete/:id",
  verifyAuthentication(),
  folderController.delete
);

export const folderRouter = router;
