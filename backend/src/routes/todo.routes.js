import { Router } from "express";
import { getTodos, getTodo, createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;