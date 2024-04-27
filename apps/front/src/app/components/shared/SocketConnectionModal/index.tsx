import { useEffect } from 'react';
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import LoadingModal from '../LoadingModal';
import { useGame } from '../../../context/game/useGame';
import useNavigatorOnLine from '../../../hooks/useNavigatorOnLine';
import { LocalStorageKey } from '../../../commons/enums/storage.enum';
import { IGameToRecoverData } from '../../../commons/interfaces';
import { Log } from '../../../context/game/Logs';
import toast from 'react-hot-toast';
import { InfoOutlined } from '@mui/icons-material';

const SocketConnectionModal = () => {
  const { isConnected, socket, actions } = useGameSockets();
  const { setLogs, logs: contextLogs } = useGame();
  const isOnline = useNavigatorOnLine();

  function isLessThan30Min(date: Date): boolean {
    const currentDate = new Date();
    const millisecondsDiff = currentDate.getTime() - date.getTime();

    if (millisecondsDiff < 0) return false;

    const minutesDiff = millisecondsDiff / (1000 * 60);

    return minutesDiff < 30;
  }

  const getVolatileData = (): null | IGameToRecoverData => {
    const storageData = localStorage.getItem(LocalStorageKey.VolatileGame);

    if (storageData) {
      const { game, logs, player, date } = JSON.parse(storageData) as IGameToRecoverData;
      if (date && isLessThan30Min(new Date(date))) {
        const recoveredLogs = logs.map(log => new Log(log, player.token));
        return {
          game,
          logs: recoveredLogs,
          player,
        };
      }
    }
    return null;
  };

  useEffect(() => {
    if (isOnline && isConnected && socket.id) {
      const volatileData = getVolatileData();
      if (volatileData?.game.room && volatileData?.player.token) {
        const { game, player, logs } = volatileData;
        if (socket.id !== player.socketId) {
          toast(`Trying to reconnect to room: ${game.room}.`, {
            icon: <InfoOutlined color="info" />,
          });
          actions.joinRoom(game.room, () => {
            actions.joinGameToToken(player);
            if (!contextLogs.length) {
              setLogs(logs);
            }
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, isConnected, socket.id]);

  if (!isOnline) {
    return <LoadingModal open title="You are disconnected." detail="Waiting for internet connection..." />;
  }

  return (
    <LoadingModal open={!isConnected} message="Waiting for socket connection." />
  );
};

export default SocketConnectionModal;