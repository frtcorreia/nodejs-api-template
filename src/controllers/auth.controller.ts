import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../helpers/tokenGenerator";
import prisma from "../helpers/prismaClient";
import { sendEmail } from "../services/email.service";

// Register user
export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const activationToken = generateToken();
  const activationExpires = new Date(Date.now() + 3600000);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        activationToken,
        activationExpires,
      },
    });

    const activationUrl = `${process.env.ENVIRONMENT_URL}/activate-account?token=${activationToken}`;
    await sendEmail(
      email,
      "Account Activation",
      `Please use the following link to activate your account: ${activationUrl}`
    );

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "", {
    expiresIn: "24h",
  });
  res.json({ user, token });
};

// Activate user
export const activateUser = async (req: Request, res: Response) => {
  const { email, token } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
        activationToken: token,
        activationExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: true,
        activationToken: null,
        activationExpires: null,
      },
    });

    await sendEmail(
      email,
      "Account Activation",
      `Account activated successfully`
    );

    res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const token = generateToken();
    const tokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        passwordResetExpires: tokenExpiry,
      },
    });

    const resetUrl = `${process.env.ENVIRONMENT_URL}/reset-password?token=${token}`;
    await sendEmail(
      email,
      "Password Reset",
      `Please use the following link to reset your password: ${resetUrl}`
    );

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, newPassword } = req.body;
  console.log(email, token, newPassword);
  try {
    if (!email || !token || !newPassword) {
      return res.status(400).json({ error: "Missing data" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
