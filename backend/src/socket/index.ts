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
        socket.disconnect();
        return;
      }

      const parsedCookies = cookie.parse(rawCookie);
      const token = parsedCookies.token;

      if (!token) {
        socket.disconnect();
        return;
      }

      const secretKey = process.env.JWT_SECRET_KEY as string;
      const decoded = jwt.verify(token, secretKey) as JwtPayload;

      socket.data.userId = decoded.userId;

      const roomName = `user:${decoded.userId}`;
      socket.join(roomName);

      socket.on("disconnect", () => { });
    } catch (err) {
      console.error("Socket auth failed");
      socket.disconnect();
    }
  });
};
