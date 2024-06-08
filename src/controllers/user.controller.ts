import { Response } from "express";
import prisma from "../helpers/prismaClient";
import { AuthRequest } from ".";
import bcrypt from "bcryptjs";

export const getUserData = async (req: AuthRequest, res: Response) => {
  const userId = req.user!;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(201).json({ message: "User data", user });
  } catch (error) {
    res.status(400).json({ error: "User doesn't exists" });
  }
};

export const updateUserData = async (req: AuthRequest, res: Response) => {
  const userId = req.user!;
  const { password, name, isActive } = req.body;

  try {
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        password: password && (await bcrypt.hash(password, 10)),
        isActive,
      },
    });

    res.status(201).json({ message: "User updated" + userId, userUpdated });
  } catch (error) {
    res.status(400).json({ error: "User doesn't exists" });
  }
};
