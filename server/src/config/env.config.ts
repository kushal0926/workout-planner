import path from "node:path";
import { config } from "dotenv";

config({
  path: path.resolve(process.cwd(), "server/.env"),
  quiet: true,
});

export const NODE_ENV: string = process.env["NODE_ENV"] || "development";
export const PORT: string = process.env["PORT"] || "5000";
export const BASE_URL: string = process.env["BASE_URL"] || "http://localhost:5001";
export const DATABASE_URL: string = process.env["DATABASE_URL"] || "";
export const FRONTEND_URL: string = process.env["FRONTEND_URL"] || "http://localhost:5173";

export const CORS_ORIGINS: string[] = (process.env["CORS_ORIGINS"] || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

export const OPENROUTER_KEY: string = process.env["OPENROUTER_KEY"] || "";

// Validate required environment variables
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

if (!OPENROUTER_KEY) {
  throw new Error("OPENROUTER_KEY is not set in environment variables");
}

