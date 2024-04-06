import { IPlayer } from "@monopoly-wallet/shared-types"
import { AddBusinessOutlined, LocalAtmOutlined, LogoutOutlined, SwapHorizOutlined } from "@mui/icons-material";
import { Avatar, Card, Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IconButtonText from "../components/shared/IconButtonText";

type Props = {
  player: IPlayer;
}

const UserScreen: FC<Props> = ({ player }) => {
  return (
    <Grid container height="100%" p={2}>
      <Stack width="100%" gap={4}>
        <Grid container alignItems="center" gap={2}>
          <Avatar
            src="https://thumb.spokesman.com/5yUS3g90Y9DUE6F5KpuwTELL4hc=/2500x0/media.spokesman.com/photos/2013/01/11/monopoly_token_car.png"
            alt="token"
          />
          <Typography variant="h6">
            {player.name}
          </Typography>
          <IconButtonText text="Leave game" color="error" sx={{ ml: 'auto' }}>
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

          <IconButtonText text="Transfer">
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