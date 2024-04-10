import { Socket } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useEffect, useMemo } from "react";
import { CustomError, SocketEvent } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";
import { SocketActions } from "./SocketActions";
import toast from "react-hot-toast";

type Props = PropsWithChildren<{
  socket: Socket;
}>;

const SocketProvider: FC<Props> = ({ children, socket }) => {
  const actions = new SocketActions(socket);

  useEffect(()=>{
    try {
      socket.onAny((args) => {
        console.log('Socket name: >> ', args);
      })

      socket.on(SocketEvent.GAME_UPDATED, (data) => {
        console.log('tokens :>> ', data);
      });

      socket.on(SocketEvent.CUSTOM_ERROR, (data: CustomError) => {
        console.log('Error data :>> ', data);
        toast.error(data.code);
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
    actions,
    socket
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
