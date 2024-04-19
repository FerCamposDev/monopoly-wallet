import { Socket } from "socket.io-client";
import { SocketActions } from "./SocketActions";

export type SocketContextTypes = {
  socket: Socket;
  actions: SocketActions;
  isConnected: boolean;
}