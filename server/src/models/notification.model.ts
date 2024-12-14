import { Schema } from "mongoose";
import {  INotification } from "../types/type";


const NotificationSchema = new Schema<INotification>(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        fromUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        toUser: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        read: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ]
    },
    { timestamps: true }
);