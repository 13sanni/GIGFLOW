import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
export const initSocket = (io) => {
    io.on("connection", (socket) => {
        try {
            const rawCookie = socket.handshake.headers.cookie;
            if (!rawCookie) {
                console.log("No cookie, disconnecting socket");
                socket.disconnect();
                return;
            }
            const parsedCookies = cookie.parse(rawCookie);
            const token = parsedCookies.token;
            if (!token) {
                console.log("No token cookie, disconnecting socket");
                socket.disconnect();
                return;
            }
            const secretKey = process.env.JWT_SECRET_KEY;
            const decoded = jwt.verify(token, secretKey);
            socket.data.userId = decoded.userId;
            const roomName = `user:${decoded.userId}`;
            socket.join(roomName);
            console.log(`Socket connected: ${socket.id}, user: ${decoded.userId}`);
            socket.on("disconnect", () => {
                console.log(`Socket disconnected: ${socket.id}, user: ${decoded.userId}`);
            });
        }
        catch (err) {
            console.log("Socket auth failed");
            socket.disconnect();
        }
    });
};
//# sourceMappingURL=index.js.map