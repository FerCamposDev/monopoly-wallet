import { io } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useMemo } from "react";
import { SocketActions } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";

const SOCKET_URL = 'http://localhost:3333';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = io(SOCKET_URL);

  const createGame = (room: string) => {
    try {
      socket.emit(SocketActions.CREATE_GAME, room)
    } catch (error) {
      console.log('error :>> ', error);
    }
  }

  const value = useMemo((): SocketContextTypes => ({
    socket,
    createGame
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
