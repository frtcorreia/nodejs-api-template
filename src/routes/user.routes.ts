import { Router } from "express";
import { getUserData, updateUserData } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, getUserData);
router.put("/", authMiddleware, updateUserData);

export default router;
