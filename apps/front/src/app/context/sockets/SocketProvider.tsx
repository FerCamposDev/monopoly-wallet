import { Socket } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { CustomError, IGameProps, ILog, IPlayer, SocketEvent } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";
import { SocketActions } from "./SocketActions";
import toast from "react-hot-toast";
import { Log } from "../game/Logs";
import { useGame } from "../game/useGame";
import { sounds } from "../../commons/helpers/sounds";

type Props = PropsWithChildren<{
  socket: Socket;
}>;

const SocketProvider: FC<Props> = ({ children, socket }) => {
  const actions = new SocketActions(socket);
  const { setGame, setPlayer, setLogs } = useGame();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(()=>{
    try {
      socket.onAny((e) => console.log('Event received: >> ', e));

      socket.on(SocketEvent.GAME_UPDATED, (data: IGameProps) => {
        setGame(data);
      });

      socket.on(SocketEvent.PLAYER_JOINED, (currentPlayer: IPlayer) => {
        if (currentPlayer.socketId === socket.id) {
          setPlayer(currentPlayer);
        }
      });

      socket.on(SocketEvent.PLAYER_UPDATED, (updatedPlayer: IPlayer) => {
        setPlayer(updatedPlayer);
      });

      socket.on(SocketEvent.LOG, (log: ILog) => {
        const newLog = new Log(log, socket.id);
        if (newLog.isIn) {
          sounds.received();
        }
        setLogs(prev => [...prev, newLog]);
      })

      socket.on(SocketEvent.CUSTOM_ERROR, (data: CustomError) => {
        console.log('Error data :>> ', data);
        toast.error(data.code);
      })
  
      socket.on('error', (data) => {
        console.log('Error data :>> ', data);
        toast.error(data.message);
      })
  
      socket.on("connect_error", (err) => {
        console.log(err.message);
      });

      socket.on('connect', () => {
        setIsConnected(true);
      });
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const value = useMemo((): SocketContextTypes => ({
    actions,
    socket,
    isConnected,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [isConnected]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
