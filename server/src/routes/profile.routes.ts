import handleProfileSubmit from "@/controller/profile.controller";
import { Router } from "express";

const porfileRoutes = Router();

porfileRoutes.post("/", handleProfileSubmit);

export default porfileRoutes;
