import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material'
import { Log } from '../../../context/game/Logs'
import { useToggle } from '../../../hooks'
import { ArrowBackOutlined, ArrowForwardOutlined, VisibilityOutlined } from '@mui/icons-material'
import { FC } from 'react'

type Props = {
  log: Log
}

const LogDetailModal: FC<Props> = ({ log }) => {
  const { open, handleClose, handleOpen } = useToggle()

  const renderArrows = (isIn: boolean) => {
    if (isIn) {
      return <ArrowBackOutlined color="success" />;
    }
    return <ArrowForwardOutlined color="error" />;
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <VisibilityOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          <Grid container alignItems="center">
            {log.isRelatedToPlayer && renderArrows(log.isIn)}
            {log.detail}
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {log.message}
          </DialogContentText>

          <DialogContentText>
            Time: {log.displayTime}
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default LogDetailModal