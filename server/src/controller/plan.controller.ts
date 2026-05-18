import { prisma } from "@/lib/prisma";
import type { Request, Response } from "express";
import httpsStatus from "http-status";

const handlePlanGenerate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(httpsStatus.BAD_REQUEST)
        .json({ error: "userId is required" });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { user_id: userId },
    });

    if (!profile) {
      return res
        .status(httpsStatus.BAD_REQUEST)
        .json({ error: "user profile not found, complete onboarding first." });
    }

    // plans
    const latestPlan = await prisma.trainingPlans.findFirst({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      select: { version: true },
    });

    const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

    // ai
    let planJSON

    const planText = JSON.stringify(planJSON, null, 2);

    const newPlan = await prisma.trainingPlans.create({
      data: {
        user_id: userId,
        plan_json: planJSON as any,
        plan_text: planText,
        version: nextVersion,
      },
    });

    res.json({
      id: newPlan.id,
      version: newPlan.version,
      createdAt: newPlan.created_at,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("error generating plan:", error.message);
      res
        .status(httpsStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "failed to generate plan." });
    }
  }
};

export default handlePlanGenerate;
