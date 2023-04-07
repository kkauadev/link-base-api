import { Router } from "express";
import { LinkController } from "../controllers/LinkController";

const router = Router();

const linkController = new LinkController();

router.get("/links/:folder_id", linkController.getAll);

router.get("/links/:id", linkController.getOne);

router.post("/links/create/:folder_id", linkController.create);

router.put("/links/update/:folder_id/:id", linkController.update);

router.delete("/links/delete/:folder_id/:id", linkController.delete);

export const linkRouter = router;
