import { AppBar, Avatar, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useGame } from '../../../context/game/useGame'
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import { getTokenImagePath } from '../../../commons/helpers/images';
import MenuButton from '../MenuButton';
import MuteItem from '../MuteItem';

const RoomLayout: FC<PropsWithChildren> = ({ children }) => {
  const { actions } = useGameSockets();
  const { game, player, reset } = useGame();

  const handleLeaveGame = () => {
    actions.leaveGame(reset);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {game?.room}
            </Typography>

            <Grid item display="flex" alignItems="center" gap={2}>
              <Typography variant="body2">
                {player?.name}
              </Typography>
              <Avatar
                src={getTokenImagePath(player?.token)}
                alt="token"
              />
            </Grid>
          </Grid>
          <MenuButton
            options={[
              {
                children: 'Leave Game',
                onClick: handleLeaveGame,
              },
              {
                children: <MuteItem />
              },
            ]}
          />
        </Toolbar>
      </AppBar>
      <Stack height="100%" pt={7}>
        {children}
      </Stack>
    </>
  )
}

export default RoomLayout