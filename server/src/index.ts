import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import porfileRoutes from "./routes/profile.routes";
import planRoutes from "./routes/plan.routes";

dotenv.config();

const app = express();
const PORT = process.env["PORT"];

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// api routes
app.use("/api/v1/profile", porfileRoutes);
app.use("/api/v1/plan", planRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

export default app;
