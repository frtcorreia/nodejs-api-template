import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const route = Router();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/user", userRoutes);

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to  API" });
});

app.use(route);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
