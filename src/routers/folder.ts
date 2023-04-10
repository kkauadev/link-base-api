import { Router } from "express";
import { FolderController } from "../controllers/FolderController";

const router = Router();

const folderController = new FolderController();

router.get("/folders/:user_id", folderController.getAll);

router.get("/folders/:user_id/:id", folderController.getOne);

router.post("/folders/create/:user_id", folderController.create);

router.put("/folders/update/:user_id/:id", folderController.update);

router.delete("/folders/delete/:user_id/:id", folderController.delete);

export const folderRouter = router;
