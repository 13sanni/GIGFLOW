import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";

interface JwtPayload {
  userId: string;
}

export const initSocket = (io: Server) => {
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

      const secretKey = process.env.JWT_SECRET_KEY as string;
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      socket.data.userId = decoded.userId;

      const roomName = `user:${decoded.userId}`;
      socket.join(roomName);

      console.log(
        `Socket connected: ${socket.id}, user: ${decoded.userId}`
      );

      socket.on("disconnect", () => {
        console.log(
          `Socket disconnected: ${socket.id}, user: ${decoded.userId}`
        );
      });
    } catch (err) {
      console.log("Socket auth failed");
      socket.disconnect();
    }
  });
};
