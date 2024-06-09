import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoByID,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { query } from "express-validator";

const router = Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, query("id").notEmpty(), getTodoByID);
router.put("/:id", authMiddleware, query("id").notEmpty(), updateTodo);
router.delete("/:id", authMiddleware, query("id").notEmpty(), deleteTodo);

export default router;
