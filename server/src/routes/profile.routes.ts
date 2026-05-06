import handleProfileSubmit from "@/controller/profile.controller";
import { Router } from "express";

const porfileRoutes = Router();

porfileRoutes.get("/", handleProfileSubmit);

export default porfileRoutes;
