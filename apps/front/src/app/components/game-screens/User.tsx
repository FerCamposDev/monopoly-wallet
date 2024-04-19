import { AddBusinessOutlined, LocalAtmOutlined, SwapHorizOutlined } from "@mui/icons-material";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IconButtonText from "../shared/IconButtonText";
import { useGame } from "../../context/game/useGame";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../commons/enums/routes.enum";
import LogsList from "../shared/LogsList";

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
          <IconButtonText text="Collect" onClick={() => navigate(Routes.GameCollect)}>
            <LocalAtmOutlined />
          </IconButtonText>

          <IconButtonText text="Transfer" onClick={() => navigate(Routes.GameTransfer)}>
            <SwapHorizOutlined />
          </IconButtonText>

          <IconButtonText text="Pay to Bank" onClick={() => navigate(Routes.GameToBank)}>
            <AddBusinessOutlined />
          </IconButtonText>
        </Grid>

        <LogsList isUserLog />
      </Stack >
    </Grid >
  )
}

export default UserScreen