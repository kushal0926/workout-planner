import { Router } from "express";

const planRoutes = Router();

planRoutes.get("/", (_, res) => {
  res.json({ message: "Plan endpoint" });
});

export default planRoutes;
