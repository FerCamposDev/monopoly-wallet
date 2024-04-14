import { AddBusinessOutlined, LocalAtmOutlined, SwapHorizOutlined } from "@mui/icons-material";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IconButtonText from "../shared/IconButtonText";
import { useGame } from "../../context/game/useGame";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../commons/enums/routes.enum";

const UserScreen: FC = () => {
  const { game, player } = useGame();
  const navigate = useNavigate();

  if (!game) return null;

  return (
    <Grid container height="100%" p={2}>
      <Stack width="100%" gap={4}>
        <Card>
          <Typography variant="h2" textAlign="center">
            $ {player?.balance.toLocaleString()}
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