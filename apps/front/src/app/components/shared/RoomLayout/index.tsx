import { AppBar, Avatar, Grid, Toolbar, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useGame } from '../../../context/game/useGame'
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import { getTokenImagePath } from '../../../commons/helpers/images';
import MenuButton from '../MenuButton';

const RoomLayout: FC<PropsWithChildren> = ({ children }) => {
  const { actions } = useGameSockets();
  const { game, player } = useGame();

  if (!player) return null;

  const handleLeaveGame = () => {
    actions.leaveGame();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar >
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
            options={[{
              children: 'Leave Game',
              onClick: handleLeaveGame,
            }]}
          />
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}

export default RoomLayout