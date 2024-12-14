import { Router } from "express";
import { verifyAuth } from "../middlewares/auth.middleware";
import { ROLES } from "../utils/constants";
import { getNotifications } from "../controllers/notification.controller";

const router = Router();

router.get("/", verifyAuth(Object.values(ROLES)), getNotifications);

export default router;