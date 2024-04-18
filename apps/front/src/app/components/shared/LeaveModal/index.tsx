import React, { FC } from 'react';
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import { useGame } from '../../../context/game/useGame';
import { useToggle } from '../../../hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemText } from '@mui/material';

const LeaveModal: FC = () => {
  const { actions } = useGameSockets();
  const { reset } = useGame();
  const { open, handleClose, handleOpen } = useToggle();

  const handleLeaveGame = () => {
    actions.leaveGame(reset);
  };

  return (
    <React.Fragment>
      <ListItemText onClick={handleOpen}>
        Leave Game
      </ListItemText>
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