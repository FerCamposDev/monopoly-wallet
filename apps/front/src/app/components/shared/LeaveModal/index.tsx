import React, { FC } from 'react';
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import { useGame } from '../../../context/game/useGame';
import { useToggle } from '../../../hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, ListItemText, Typography } from '@mui/material';
import { useThemeActions } from '../../../theme/ThemeContext';

const LeaveModal: FC = () => {
  const { actions } = useGameSockets();
  const { resetPrimaryColor } = useThemeActions();
  const { reset } = useGame();
  const { open, handleClose, handleOpen } = useToggle();

  const onSuccess = () => {
    reset();
    resetPrimaryColor();
  };

  const handleLeaveGame = () => {
    actions.leaveGame(onSuccess);
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText onClick={handleOpen}>
          <Typography variant='subtitle2' color="error">
            Leave Game
          </Typography>
        </ListItemText>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to leave the Game?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave the game your user wont't be able for the other players.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" onClick={handleLeaveGame}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default LeaveModal