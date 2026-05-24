import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import porfileRoutes from "./routes/profile.routes";
import planRoutes from "./routes/plan.routes";
import { PORT } from "./config/env.config";

dotenv.config({
  quiet: true,
});

const app = express();
const port = PORT;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// api routes
app.use("/api/v1/profile", porfileRoutes);
app.use("/api/v1/plan", planRoutes);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

export default app;
