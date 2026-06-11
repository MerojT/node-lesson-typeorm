import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "../models/user.entity.js";
import { TodoEntity } from "../models/todo.model.js";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  ssl: { rejectUnauthorized: false },
  entities: [UserEntity, TodoEntity],
});