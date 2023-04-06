import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const data = await AppDataSource.manager.find(User, {
      relations: ["folders", "folders.links"],
    });
    res.json({ status: "success", data });
  } catch (err) {
    console.log(err);
  }
});

router.post("/create/user", async (req: Request, res: Response) => {
  try {
    if (req.body.name) {
      const newUser = AppDataSource.manager.create(User, {
        name: req.body.name,
      });
      await AppDataSource.manager.save(newUser);
      res.json({ newUser });
    }
  } catch (err) {
    console.log(err);
  }
});

export default router;
