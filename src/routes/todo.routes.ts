import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodoByID,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.get("/:id", authMiddleware, getTodoByID);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
