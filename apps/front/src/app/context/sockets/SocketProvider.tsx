import { Socket } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useContext, useEffect, useMemo } from "react";
import { CustomError, IGameProps, ILog, IPlayer, SocketEvent } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";
import { SocketActions } from "./SocketActions";
import toast from "react-hot-toast";
import GameContext from "../game/GameContext";

type Props = PropsWithChildren<{
  socket: Socket;
}>;

const SocketProvider: FC<Props> = ({ children, socket }) => {
  const actions = new SocketActions(socket);
  const { setGame, setPlayer } = useContext(GameContext);

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

      socket.on(SocketEvent.PLAYER_LEAVES_GAME, () => {
        setPlayer(null);
      });

      socket.on(SocketEvent.LOG, (log: ILog) => {
        console.log('log :>> ', log);
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
    } catch (error) {
      console.log(error)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const value = useMemo((): SocketContextTypes => ({
    actions,
    socket
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [socket]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
};

export default SocketProvider;
