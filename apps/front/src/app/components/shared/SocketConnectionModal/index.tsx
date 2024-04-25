import { useEffect } from 'react'
import { useGameSockets } from '../../../context/sockets/useGameSockets'
import LoadingModal from '../LoadingModal';
import { useGame } from '../../../context/game/useGame';
import useNavigatorOnLine from '../../../hooks/useNavigatorOnLine';

const SocketConnectionModal = () => {
  const { isConnected, socket, actions } = useGameSockets();
  const { game, player } = useGame();
  const isOnline = useNavigatorOnLine();
  
  useEffect(() => { 
    if (isOnline && isConnected && socket.id) {
      if (game?.room && player.token) {
        if (socket.id !== player.socketId) {
          actions.joinRoom(game.room);
          actions.joinGameToToken(player);
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
  )
}

export default SocketConnectionModal