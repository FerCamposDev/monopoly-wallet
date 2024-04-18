import { AppBar, Avatar, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useGame } from '../../../context/game/useGame'
import { getTokenImagePath } from '../../../commons/helpers/images';
import MenuButton from '../MenuButton';
import MuteItem from '../MuteItem';
import LeaveModal from '../LeaveModal';

const RoomLayout: FC<PropsWithChildren> = ({ children }) => {
  const { game, player } = useGame();

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
                children: <LeaveModal />,
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