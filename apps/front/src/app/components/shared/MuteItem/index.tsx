import { useState } from "react"
import { MuteStatus, isMute as isMuteFn, setMute } from "../../../commons/helpers/sounds";
import { Grid, ListItemButton } from "@mui/material";
import { VolumeOffOutlined, VolumeUpOutlined } from "@mui/icons-material";

const MuteItem = () => {
  const [isMute, setIsMute] = useState(isMuteFn());
  
  const handleMute = () => {
    isMute ? setMute(MuteStatus.false) : setMute(MuteStatus.true);
    setIsMute(prev => !prev);
  };

  return (
    <ListItemButton dense disableGutters disableRipple disableTouchRipple onClick={handleMute}>
      <Grid container justifyContent="space-between" alignItems="center">
        {isMute ? 'Off' : 'On'}
        {isMute ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
      </Grid>
    </ListItemButton>
  )
}

export default MuteItem