import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import connectDB from "./config/db.js";
import { setIO } from "./socket/socketStore.js";

const server = http.createServer(app);

const clientUrl = process.env.CLIENT_URL;
const socketOrigins: string[] = [
  "http://localhost:5173",
  ...(clientUrl ? [clientUrl] : []),
];

const io = new Server(server, {
  cors: {
    origin: socketOrigins,
    credentials: true,
  },
});

setIO(io);
initSocket(io);

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
