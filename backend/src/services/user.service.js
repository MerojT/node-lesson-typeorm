import * as userRepository from "../repositories/user.repository.js";
import jwt from 'jsonwebtoken';

export const getUsers = async () => {
	return userRepository.findAllUsers();
};

export const getUser = async (id) => {
	const user = await userRepository.findUserById(id);

	if (!user) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return user;
};

export const createUser = async (data) => {
	const { name, email, age, password, role } = data;

	if (!name || !email || !password) {
		const error = new Error("Name, email and password are required");
		error.statusCode = 400;
		throw error;
	}

	return userRepository.createUser({ name, email, age, role, password });
};

export const deleteUser = async (id) => {
	const deletedUser = await userRepository.deleteUserById(id);

	if (!deletedUser) {
		const error = new Error("User not found");
		error.statusCode = 404;
		throw error;
	}

	return deletedUser;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await userRepository.findUserByEmail(email);

  if (!user || user.password !== password) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { token, refreshToken, user };
};