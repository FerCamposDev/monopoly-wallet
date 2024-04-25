import { FC, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { useToggle } from "../../../hooks";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { LocalStorageKey } from "../../../commons/enums/storage.enum";
import { IGameToRecoverData } from "../../../commons/interfaces";
import RemoveGame from "./RemoveGame";
import { Log } from "../../../context/game/Logs";
import { useGame } from "../../../context/game/useGame";

const RestoreGameModal: FC = () => {
  const { open, handleClose, handleOpen } = useToggle();
  const { setLogs } = useGame();
  const { isConnected, socket, actions } = useGameSockets();

  useEffect(() => {
    if (isConnected) {
      if (localStorage.getItem(LocalStorageKey.Game)) {
        handleOpen();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const recoverGame = () => {
    const storageData = localStorage.getItem(LocalStorageKey.Game);
    if (storageData && socket.id) {
      const { game, logs, player } = JSON.parse(storageData) as IGameToRecoverData;
      const recoveredLogs = logs.map(log => new Log(log, player.token));
      setLogs(recoveredLogs);
      actions.restoreGame(game.room, game);
      actions.joinGameToToken(player);
    }
  }

  const removeGame = () => {
    localStorage.removeItem(LocalStorageKey.Game);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Game Backup Detected.
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Do you want to restore this game?
        </DialogContentText>
      </DialogContent>

      <Grid mx={1}>
        <RemoveGame onRemove={removeGame} />
      </Grid>

      <DialogActions>
        <Button onClick={handleClose}>
          Close
        </Button>
        <Button variant='contained' onClick={recoverGame}>
          Restore Game
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RestoreGameModal;
