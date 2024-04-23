import { AppBar, Avatar, Container, Grid, Stack, Toolbar, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { useGame } from '../../../context/game/useGame'
import { getTokenImagePath } from '../../../commons/helpers/images';
import MenuButton from '../MenuButton';
import MuteItem from '../MuteItem';
import LeaveModal from '../LeaveModal';
import { colorByToken } from '../../../commons/mappers/tokens';
import ToggleThemeButton from '../ToggleThemeButton';

type Props = PropsWithChildren<{
  isBankTab?: boolean
}>;

const RoomLayout: FC<Props> = ({ children, isBankTab }) => {
  const { game, player } = useGame();

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: isBankTab ? undefined : colorByToken[player.token] }}>
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
              { children: <LeaveModal /> },
              { children: <MuteItem /> },
              { children: <ToggleThemeButton /> },
            ]}
          />
        </Toolbar>
      </AppBar>

      <Stack height="100%" pt={7}>
        <Container
          sx={{ height: '100%', p: 0 }}
          maxWidth="sm"
        >
          {children}
        </Container>
      </Stack>
    </>
  )
}

export default RoomLayout