import { Router } from "express";
import { profileController } from "./profile.controller";

const router = Router();

export const profileRouter = router;

router.post("/", profileController.createProfile);



