import { Stack } from "@mui/material"
import GameModal from "../components/GameModal";

const HomePage = () => {

  return (
    <Stack justifyContent="space-evenly">
      <GameModal type="Join" />
      <GameModal type="Host" />
    </Stack>
  )
}

export default HomePage