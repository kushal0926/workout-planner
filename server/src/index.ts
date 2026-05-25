import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import profileRoutes from "./routes/profile.routes";
import planRoutes from "./routes/plan.routes";
import { PORT, CORS_ORIGINS, NODE_ENV } from "./config/env.config";

dotenv.config({
  quiet: true,
});

const app = express();
const port = PORT;

// Security middleware: Helmet for HTTP headers
app.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

// CORS middleware with configured origins
app.use(
  cors({
    origin: CORS_ORIGINS,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Request logging middleware for production debugging
app.use((req, _res, next) => {
  if (NODE_ENV === "development") {
    console.log(`${req.method} ${req.path}`);
  }
  next();
});

// API routes
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/plan", planRoutes);

// Health check endpoint for Vercel
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handling middleware
app.use(
  (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).json({
      error: NODE_ENV === "production" ? "Internal server error" : err.message,
    });
  }
);

// Bind to 0.0.0.0 for Vercel compatibility
app.listen(parseInt(port), "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
