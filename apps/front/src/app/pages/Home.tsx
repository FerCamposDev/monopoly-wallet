import { Button, Stack } from "@mui/material"
import GameModal from "../components/GameModal";
import { useGameSockets } from "../context/sockets/useGameSockets";
import { MOCK_PLAYER } from "../../commons/mocks/player";
import { useGame } from "../context/game/useGame";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomPath } from "../../commons/helpers/routes";

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
      <GameModal type="Join" action={actions.createGame} />
      <GameModal type="Host" action={actions.leaveRoom} />
      <Button onClick={() => actions.createGame('sample')}>
        Create
      </Button>
      <Button onClick={() => actions.joinGame('sample', MOCK_PLAYER)}>
        Join game
      </Button>
      <Button onClick={() => actions.leaveGame('sample', MOCK_PLAYER)}>
        Leave
      </Button>
    </Stack>
  )
}

export default HomePage