import type { Server } from "socket.io";

let io: Server | null = null;

export const setIO = (ioInstance: Server) => {
  io = ioInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
