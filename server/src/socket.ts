import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Notification } from "./models/notification.model";
import { User } from "./models/user.model";
import { ROLES } from "./utils/constants";
import { Book } from "./models/book.model";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

const userSocketMap: any = {}; // userId: socketId

export const getRecipientSocketId = (recipientId: string) => {
    return userSocketMap[recipientId];
};


io.on("connection", (socket) => {
    const userId: any = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;
    // Send online users data to client
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("issue-book", async ({ userId, bookId }) => {
        const adminUser = await User.findOne({ role: ROLES.ADMIN })
        const book = await Book.findById(bookId)
        const userSocketId = getRecipientSocketId(userId);
        const user = await User.findById(userId)
        const notification = await Notification.create({
            toUser: adminUser?._id,
            fromUser: user,
            content: `${user?.name} issued the book: ${book?.title}`
        })

        io.to(userSocketId).emit("book-issued", { bookId, userId: adminUser?._id, notification })
    })

    // Handle the disconnect event from client
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };