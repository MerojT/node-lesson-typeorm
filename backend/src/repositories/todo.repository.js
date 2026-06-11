import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.model.js";

const todoRepo = AppDataSource.getRepository(TodoEntity);

export const findAllTodosByUserId = async (userId) => {
  return todoRepo.find({
    where: { user: { id: userId } },
    order: { createdAt: "DESC" },
  });
};

export const findTodoById = async (id) => {
  return todoRepo.findOneBy({ id });
};

export const createTodo = async ({ title, description, userId }) => {
  const todo = todoRepo.create({
    title,
    description,
    user: { id: userId },
  });
  return todoRepo.save(todo);
};

export const deleteTodoById = async (id) => {
  const todo = await todoRepo.findOneBy({ id });
  if (!todo) return null;
  await todoRepo.remove(todo);
  return todo;
};

export const updateTodoById = async (id, data) => {
  await todoRepo.update(id, data);
  return todoRepo.findOneBy({ id });
};