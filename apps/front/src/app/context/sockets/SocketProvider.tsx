import { Socket } from "socket.io-client";
import SocketContext from "./SocketsContext";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { CustomError, GameErrors, IGameProps, ILog, IPlayer, SocketEvent } from "@monopoly-wallet/shared-types";
import { SocketContextTypes } from "./types";
import { SocketActions } from "./SocketActions";
import toast from "react-hot-toast";
import { Log } from "../game/Logs";
import { useGame } from "../game/useGame";
import { sounds } from "../../commons/helpers/sounds";
import { colorByToken } from "../../commons/mappers/tokens";
import { useThemeActions } from "../../theme/ThemeContext";
import { Info } from "@mui/icons-material";

type Props = PropsWithChildren<{
  socket: Socket;
}>;

const SocketProvider: FC<Props> = ({ children, socket }) => {
  const actions = new SocketActions(socket);
  const { setGame, setPlayer, setLogs } = useGame();
  const { setPrimaryColor } = useThemeActions();
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
          setPrimaryColor(colorByToken[currentPlayer.token])
        } else {
          toast(`${currentPlayer.token} joined as ${currentPlayer.name}`, {
            icon: <Info color="info" />,
            position: 'bottom-left',
          })
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
        if(data.code === GameErrors.InsufficientFounds) {
          sounds.transactionError();
        }
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

      socket.on('disconnect', () => {
        setIsConnected(false);
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
