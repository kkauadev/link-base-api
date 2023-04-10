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

router.get(
  "/folders/:user_id/:id",
  verifyAuthentication(),
  folderController.getOne
);

router.post(
  "/folders/create/:user_id",
  verifyAuthentication(),
  folderController.create
);

router.put(
  "/folders/update/:user_id/:id",
  verifyAuthentication(),
  folderController.update
);

router.delete(
  "/folders/delete/:user_id/:id",
  verifyAuthentication(),
  folderController.delete
);

export const folderRouter = router;
