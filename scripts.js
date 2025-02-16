const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sessions = {};

io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecté");
    
    socket.on("join", ({ username, sessionId }) => {
        socket.username = username;
        socket.sessionId = sessionId;
        if (!sessions[sessionId]) sessions[sessionId] = [];
        socket.join(sessionId);
        socket.emit("chatHistory", sessions[sessionId]);
    });
    
    socket.on("message", (msg) => {
        const fullMessage = `${socket.username}: ${msg}`;
        sessions[socket.sessionId].push(fullMessage);
        io.to(socket.sessionId).emit("message", fullMessage);
    });
    
    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est déconnecté");
    });
});

server.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
