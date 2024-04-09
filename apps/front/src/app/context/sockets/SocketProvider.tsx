import { io } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { SocketEvent } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";
import { SocketActions } from "./SocketActions";

const SOCKET_URL = 'http://localhost:3333';

const SocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const socket = io(SOCKET_URL);
  const actions = new SocketActions(socket);

  useEffect(()=>{
    // TODO: launch with toasts
    try {
      socket.onAny((args) => {
        console.log('Socket name: >> ', args);
      })

      socket.on(SocketEvent.AVAILABLE_TOKENS, (data) => {
        console.log('tokens :>> ', data);
      });

      socket.on(SocketEvent.CUSTOM_ERROR, (data) => {
        console.log('Error data :>> ', data);
      })
  
      socket.on('error', (data) => {
        console.log('Error data :>> ', data);
      })
  
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });
    } catch (error) {
      console.log(error)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const value = useMemo((): SocketContextTypes => ({
    socket,
    actions,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
