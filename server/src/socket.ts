import { Server } from "socket.io";
import http from "http";
import express from "express";

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

    // Handle the typing events from client
    socket.on("startTyping", ({ participants, chatId }) => {
        participants.forEach((participantId: string) => {
            const participantSocketId = getRecipientSocketId(participantId);
            if (participantSocketId) {
                io.to(participantSocketId).emit("typing", { chatId, userId });
            }
        });
    });

    socket.on("issue-book", ({ users, bookId }) => {
        users.forEach((user: string) => {
            const userSocketId = getRecipientSocketId(user);
            // Create a notification object and emit the created notification
            if (userSocketId) {
                io.to(userSocketId).emit("book-issued", { bookId, userId })
            }
        });
    })

    // Handle the disconnect event from client
    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };