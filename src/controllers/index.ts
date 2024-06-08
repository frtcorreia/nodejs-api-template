import { Request } from "express";

export * from "./auth.controller";
export * from "./todo.controller";
export * from "./user.controller";

export interface AuthRequest extends Request {
  user?: number;
}
