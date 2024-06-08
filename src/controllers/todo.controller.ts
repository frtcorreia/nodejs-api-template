import { Response } from "express";
import { AuthRequest } from ".";
import prisma from "../helpers/prismaClient";

export const createTodo = async (req: AuthRequest, res: Response) => {
  const { title, description } = req.body;
  const userId = req.user!;

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });

  res.status(201).json({ message: "Todo created successfully", data: todo });
};

// Get all TODOs
export const getTodos = async (req: AuthRequest, res: Response) => {
  const userId = req.user!;

  const todos = await prisma.todo.findMany({
    where: { userId },
  });

  res.json(todos);
};

// Get  TODOs by ID
export const getTodoByID = async (req: AuthRequest, res: Response) => {
  const userId = req.user!;
  const { id } = req.params;

  const todo = await prisma.todo.findFirst({
    where: { userId, id: Number(id) },
  });
  console.log({ userId, id, todo });
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  res.json(todo);
};

// Update TODO
export const updateTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, done } = req.body;
  const userId = req.user!;

  const todoFound = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  if (!todoFound) {
    return res.status(404).json({ error: `TODOs with ID ${id} not found` });
  }

  const todo = await prisma.todo.update({
    where: { id: Number(id), userId },
    data: {
      title,
      description,
      done,
    },
  });

  res.json({ message: "Todo updated", data: todo });
};

// Delete TODO
export const deleteTodo = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!;

  const capture = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });

  if (!capture) {
    return res.status(400).json({ error: `Capture with ID ${id} not found` });
  }

  const todo = await prisma.todo.delete({
    where: { id: Number(id), userId },
  });

  res.json({ message: "Todo deleted" });
};
