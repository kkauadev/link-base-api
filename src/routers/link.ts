import { Router } from "express";
import { LinkController } from "../controllers/LinkController";
import { verifyAuthentication } from "../middlewares/authenticated";

const router = Router();

const linkController = new LinkController();

router.get(
  "/linksall/:folder_id",
  verifyAuthentication(),
  linkController.getAll
);

router.get("/links/:id", verifyAuthentication(), linkController.getOne);

router.post(
  "/links/create/:folder_id",
  verifyAuthentication(),
  linkController.create
);

router.put("/links/update/:id", verifyAuthentication(), linkController.update);

router.delete(
  "/links/delete/:id",
  verifyAuthentication(),
  linkController.delete
);

export const linkRouter = router;
