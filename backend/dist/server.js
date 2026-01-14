import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import connectDB from "./config/db.js";
import { setIO } from "./socket/socketStore.js";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    },
});
setIO(io);
initSocket(io);
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
connectDB();
//# sourceMappingURL=server.js.map