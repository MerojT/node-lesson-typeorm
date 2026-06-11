import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import { AppDataSource } from "./config/data-source.js";
import { startBot } from "./bot/bot.js";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

await AppDataSource.initialize();
console.log("Postgres TypeORM orqali ulandi");

startBot();

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlamoqda`);
});

app.use(cors({
  origin: 'https://node-lesson-typeorm.vercel.app',
  credentials: true
}))