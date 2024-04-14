import { Stack } from "@mui/material"
import GameModal from "../components/GameModal";
import { useGameSockets } from "../context/sockets/useGameSockets";
import { useGame } from "../context/game/useGame";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomPath } from "../commons/helpers/routes";

const HomePage = () => {
  const { actions } = useGameSockets();
  const { game } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    if (game?.room) {
      navigate(getRoomPath(game.room));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game?.room]);

  return (
    <Stack justifyContent="space-evenly">
      <GameModal type="Join" action={actions.joinRoom} />
      <GameModal type="Host" action={actions.createGame} />
    </Stack>
  )
}

export default HomePage