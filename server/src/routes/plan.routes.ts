import handlePlanGenerate from "@/controller/plan.controller";
import { Router } from "express";

const planRoutes = Router();

planRoutes.post("/generate", handlePlanGenerate);

export default planRoutes;
