import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, ListItemText } from '@mui/material';
import toast from 'react-hot-toast';
import { useGame } from '../../../context/game/useGame';
import { LocalStorageKey } from '../../../commons/enums/storage.enum';
import { useToggle } from '../../../hooks';
import { IGameToRecoverData } from '../../../commons/interfaces';

const SaveGameItem = () => {
  const { game, player, logs } = useGame();
  const { open, handleClose, handleOpen } = useToggle();

  const saveGame = () => {
    const gameData: IGameToRecoverData = { game, player, logs };
    localStorage.setItem(LocalStorageKey.Game, JSON.stringify(gameData));
    toast.success('Game saved!');
    handleClose();
  };

  const handleSaveOrOpen = () => {
    if (localStorage.getItem(LocalStorageKey.Game)) {
      return handleOpen();
    }

    saveGame();
  };

  return (
    <>
      <ListItem onClick={handleSaveOrOpen}>
        <ListItemText>
          Save Game
        </ListItemText>
      </ListItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          There is another game saved
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to replace it with the new game?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant='contained' color="error" onClick={saveGame}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SaveGameItem;