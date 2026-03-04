import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]); // ✅ Bypass broken system DNS — fixes mongodb+srv:// SRV lookups
import dotenv from "dotenv";
dotenv.config(); // ✅ Must be first — loads .env before any module reads process.env
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { initSocket } from "./socket/index.js";
import connectDB from "./config/db.js";
import { setIO } from "./socket/socketStore.js";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "https://gigflow-beta-ruby.vercel.app",
        ],
        credentials: true,
    },
});
setIO(io);
initSocket(io);
const PORT = process.env.PORT || 3000;
// ✅ Connect to DB FIRST, then start listening — prevents requests before DB is ready
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map