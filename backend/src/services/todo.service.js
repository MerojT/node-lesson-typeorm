import * as todoRepository from "../repositories/todo.repository.js";

export const getTodos = async (userId) => {
  return todoRepository.findAllTodosByUserId(userId);
};

export const getTodo = async (id) => {
  const todo = await todoRepository.findTodoById(id);
  if (!todo) {
    const error = new Error("Todo not found");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

export const createTodo = async ({ title, description, userId }) => {
  if (!title) {
    const error = new Error("Title is required");
    error.statusCode = 400;
    throw error;
  }
  return todoRepository.createTodo({ title, description, userId });
};

export const deleteTodo = async (id) => {
  const todo = await todoRepository.deleteTodoById(id);
  if (!todo) {
    const error = new Error("Todo not found");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

export const updateTodo = async (id, data) => {
  const todo = await todoRepository.updateTodoById(id, data);
  if (!todo) {
    const error = new Error("Todo not found");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};