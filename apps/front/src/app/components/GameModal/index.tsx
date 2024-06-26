import React, { FC } from 'react';
import ImageButton from './ImageButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useToggle } from '../../hooks';

type GameType = 'Join' | 'Host';

const imageUrlByType: Record<GameType, string> = {
  'Join': '/assets/images/buttons/neon-1.jpg',
  'Host': '/assets/images/buttons/neon-2.jpg',
};

type Props = {
  type: GameType;
  action: (room: string) => void;
};

const GameModal: FC<Props> = ({ type, action }) => {
  const { open, handleClose, handleOpen } = useToggle();

  return (
    <>
      <ImageButton url={imageUrlByType[type]} onClick={handleOpen}>
        {`${type} Game`}
      </ImageButton>
      <Dialog
        open={open}
        onClose={handleClose}
        disableRestoreFocus
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const roomName = formData.get('room-name')?.toString() || '';
            action(roomName);
            handleClose();
          },
        }}
      >
        <DialogTitle>{type} Game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type === 'Join' ? 'To Join to game, please enter the room name here.' : 'To Host a game, please enter a room name here.'}
          </DialogContentText>
          <DialogContentText>
            (Up to 14 Characters)
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="room-name"
            label="Room name"
            fullWidth
            variant="standard"
            inputProps={{
              maxLength: 14,
            }}
            helperText="We detect differences between lower and uppercase."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">{type}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GameModal;