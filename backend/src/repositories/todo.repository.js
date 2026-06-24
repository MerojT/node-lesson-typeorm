import { AppDataSource } from "../config/data-source.js";
import { TodoEntity } from "../models/todo.model.js";

const todoRepo = AppDataSource.getRepository(TodoEntity);

export const findAllTodosByUserId = async (userId) => {
  return todoRepo.find({
    where: { user: { id: userId } },
    order: { createdAt: "DESC" },
  });
};

export const findTodoByIdAndUser = async (id, userId) => {
  return todoRepo.findOne({
    where: { id, user: { id: userId } }
  });
};

export const createTodo = async ({ title, description, userId }) => {
  const todo = todoRepo.create({
    title,
    description,
    user: { id: userId },
  });
  return todoRepo.save(todo);
};

export const deleteTodoById = async (id, userId) => {
  const todo = await todoRepo.findOne({ where: { id, user: { id: userId } } });
  if (!todo) return null;
  
  await todoRepo.remove(todo);
  return todo;
};

export const updateTodoById = async (id, userId, data) => {
  const todo = await todoRepo.findOne({ where: { id, user: { id: userId } } });
  if (!todo) return null;

  const { title, description, completed } = data;
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;

  return todoRepo.save(todo); 
};