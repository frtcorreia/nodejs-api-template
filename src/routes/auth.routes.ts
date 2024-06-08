import { Router } from "express";
import {
  activateUser,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", activateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
