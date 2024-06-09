import { Router } from "express";
import { check } from "express-validator";
import {
  activateUser,
  forgotPassword,
  login,
  register,
  resetPassword,
} from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  register
);
router.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 6 })],
  login
);
router.post("/activate", [check("email").isEmail()], activateUser);
router.post("/forgot-password", [check("email").isEmail()], forgotPassword);
router.post(
  "/reset-password",
  [check("email").isEmail(), check("newPassword").isLength({ min: 6 })],
  resetPassword
);

export default router;
