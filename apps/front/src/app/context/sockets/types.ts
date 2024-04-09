import { Socket } from "socket.io-client"
import { SocketActions } from "./SocketActions";

export type SocketContextTypes = {
  socket: Socket | null;
  actions: SocketActions;
}