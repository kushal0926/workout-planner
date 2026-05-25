import { handleGetPlan, handlePlanGenerate } from "@/controller/plan.controller";
import { Router } from "express";

const planRoutes = Router();

planRoutes.post("/generate", handlePlanGenerate);
planRoutes.get("/current", handleGetPlan);

export default planRoutes;
