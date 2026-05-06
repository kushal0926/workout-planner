import type { Request, Response } from "express"
import httpStatus from "http-status";


const handleProfileSubmit = (req: Request, res: Response) => {
    try {
        const { userId, ...profileData } = req.body;
        if (!userId) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: "user id is  required" });
        }

        const { goal,
            experience,
            daysPerWeek,
            sessionLength,
            equipment,
            preferredSplit,
        } = profileData

        if (
            !goal ||
            !experience ||
            !daysPerWeek ||
            !sessionLength ||
            !equipment ||
            !preferredSplit
        ) {
            return res.status(httpStatus.BAD_REQUEST).json({ error: "Missing required fields" });
        }

        return res.status(httpStatus.OK).json({ message: "ok" });
    } catch (error) {
        console.log("error saving profile:", error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "failed to save error." });
    }

    res.status(httpStatus.OK).json({ messge: "ok" });
}


export default handleProfileSubmit;