import { Button, Stack } from "@mui/material"
import GameModal from "../components/GameModal";
import { useGameSockets } from "../context/sockets/useGameSockets";
import { MOCK_PLAYER } from "../../commons/mocks/player";

const HomePage = () => {
  const { actions } = useGameSockets();

  return (
    <Stack justifyContent="space-evenly">
      <GameModal type="Join" action={actions.joinRoom} />
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