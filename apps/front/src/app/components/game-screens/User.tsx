import { IPlayer } from "@monopoly-wallet/shared-types"
import { AddBusinessOutlined, LocalAtmOutlined, LogoutOutlined, SwapHorizOutlined } from "@mui/icons-material";
import { Avatar, Card, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IconButtonText from "../shared/IconButtonText";
import { getTokenImagePath } from "../../..//commons/helpers/images";
import { useGameSockets } from "../../context/sockets/useGameSockets";
import { useGame } from "../../context/game/useGame";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../commons/enums/routes.enum";

type Props = {
  player: IPlayer;
}

const UserScreen: FC<Props> = ({ player }) => {
  const { actions } = useGameSockets();
  const { game } = useGame();
  const navigate = useNavigate();

  if (!game) return null;

  const handleLeaveGame = () => {
    actions.leaveGame(game?.room);
  };

  return (
    <Grid container height="100%" p={2}>
      <Stack width="100%" gap={4}>
        <Grid container alignItems="center" gap={2}>
          <Avatar
            src={getTokenImagePath(player.token)}
            alt="token"
          />
          <Typography variant="h6">
            {player.name}
          </Typography>
          <IconButtonText
            text="Leave game"
            color="error"
            onClick={handleLeaveGame}
            sx={{ ml: 'auto' }}
          >
            <LogoutOutlined fontSize="small" />
          </IconButtonText>
        </Grid>
        <Card>
          <Typography variant="h2" textAlign="center">
            $ {player.balance.toLocaleString()}
          </Typography>
        </Card>
        <Grid container justifyContent="space-evenly">
          <IconButtonText text="Collect">
            <LocalAtmOutlined />
          </IconButtonText>

          <IconButtonText text="Transfer" onClick={() => navigate(Routes.GameTransfer)}>
            <SwapHorizOutlined />
          </IconButtonText>

          <IconButtonText text="Purchase">
            <AddBusinessOutlined />
          </IconButtonText>
        </Grid>
      </Stack >
    </Grid >
  )
}

export default UserScreen