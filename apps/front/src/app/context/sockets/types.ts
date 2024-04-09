import { Socket } from "socket.io-client"

export type SocketContextTypes = {
  socket: Socket | null;
  createGame: (room: string) => void;
}