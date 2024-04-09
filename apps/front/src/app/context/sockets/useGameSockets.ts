import { useContext } from "react"
import SocketContext from "./SocketsContext"

export const useGameSockets = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('trying to use SocketContext without SocketProvider');
  }

  return context;
}