import { SocketActions } from "./SocketActions";
import { SocketContextTypes } from "./types";

export const initialState: SocketContextTypes = {
  socket: null,
  actions: new SocketActions(null),
}