import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ručno kaži gdje je .env
dotenv.config({ path: path.join(__dirname, "../.env") });

console.log("DEBUG ENV:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
});

export const sequelize = new Sequelize(
  process.env.DB_NAME || "phonebook",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS ? String(process.env.DB_PASS) : "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    dialect: "postgres",
    logging: false,
  }
);
