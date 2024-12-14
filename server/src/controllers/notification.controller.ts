import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { throwError } from "../utils/helpers";
import { Notification } from "../models/notification.model";

export const getNotifications = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        if (!req.user) return next(throwError("Unauthorized Access", 401));

        const notifications = await Notification  .find({
            toUser: req.user._id
        })

        return res.status(200).json({
            success: true,
            message: "Current User",
            data: notifications,
        });
    } catch (error) {
        return next(error);
    }
};
