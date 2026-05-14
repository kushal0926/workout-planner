import { prisma } from "@/lib/prisma";
import type { Request, Response } from "express";
import httpStatus from "http-status";

const handleProfileSubmit = async (req: Request, res: Response) => {
  try {
    const { userId, ...profileData } = req.body;

    // checking if the user is there
    if (!userId) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: "user id is  required" });
    }

    const { goal, experience, daysPerWeek, sessionLength, equipment, injuries, preferredSplit } =
      profileData;

    // validation
    if (!goal || !experience || !daysPerWeek || !sessionLength || !equipment || !preferredSplit) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: "Missing required fields" });
    }

    await prisma.userProfile.upsert({
      where: { user_id: userId },
      update: {
        goal,
        experience,
        days_per_week: daysPerWeek,
        session_length: sessionLength,
        equipment,
        injuries: injuries || null,
        updated_at: new Date(),
      },
      create: {
        user_id: userId,
        goal,
        experience,
        days_per_week: daysPerWeek,
        session_length: sessionLength,
        equipment,
        injuries: injuries || null,
        preferred_split: preferredSplit,
      },
    });

    return res.status(httpStatus.OK).json({ success: true });
  } catch (error) {
    console.log("error saving profile:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "failed to save error." });
  }
};

export default handleProfileSubmit;
