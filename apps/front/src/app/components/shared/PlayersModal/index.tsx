import { Close, PeopleOutlined } from '@mui/icons-material';
import IconButtonText from '../IconButtonText';
import { useDevices, useToggle } from '../../../hooks';
import { AppBar, Avatar, Box, Button, Dialog, Grid, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from 'react';
import { useGame } from '../../../context/game/useGame';
import { getTokenImagePath } from '../../../commons/helpers/images';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayersModal = () => {
  const { isMobile } = useDevices();
  const { open, handleClose, handleOpen } = useToggle();
  const { game } = useGame();

  return (
    <>
      <IconButtonText text="Show Clients" color="secondary" onClick={handleOpen}>
        <PeopleOutlined />
      </IconButtonText>
      <Dialog
        fullScreen={isMobile}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} color="secondary">
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Bank Clients
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack height="100%" width="100%" minWidth={350} gap={2} sx={{ p: 2 }}>
          {game.players.map((client) => (
            <Grid key={client.token} container justifyContent="space-between">
              <Box display="flex" gap={1} alignItems="center">
                <Avatar
                  src={getTokenImagePath(client.token)}
                  alt="token"
                />
                <Stack>
                  <Typography variant="body2">
                    {client?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {client?.token}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="body2">
                  Account Balance
                </Typography>
                <Typography variant="h6" textAlign="right">
                  $ {client.balance.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          ))}

          <Button autoFocus color="secondary" variant="contained" onClick={handleClose} sx={{ mt: 'auto' }}>
            Close
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default PlayersModal;