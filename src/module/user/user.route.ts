import { Router } from "express";
import { userController } from "./user.controller";


const router = Router();

router.post("/", userController.createUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);



export const userRouter = router;