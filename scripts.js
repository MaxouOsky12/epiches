const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

let sessions = {}; // Stocke les sessions et les messages

io.on("connection", (socket) => {
    console.log("Un utilisateur s'est connecté");
    
    socket.on("createSession", ({ sessionName }, callback) => {
        let sessionId = Math.random().toString(36).substr(2, 9);
        sessions[sessionId] = { name: sessionName, messages: [] };
        callback(sessionId);
    });
    
    socket.on("join", ({ username, sessionId }) => {
        socket.join(sessionId);
        if (sessions[sessionId]) {
            socket.emit("chatHistory", sessions[sessionId].messages);
        }
    });
    
    socket.on("message", ({ sessionId, username, msg }) => {
        if (sessions[sessionId]) {
            let message = { username, msg };
            sessions[sessionId].messages.push(message);
            io.to(sessionId).emit("message", message);
        }
    });
    
    socket.on("disconnect", () => {
        console.log("Un utilisateur s'est déconnecté");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});
