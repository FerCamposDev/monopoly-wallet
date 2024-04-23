import { useState } from "react"
import { MuteStatus, isMute as isMuteFn, setMute } from "../../../commons/helpers/sounds";
import { Grid, ListItem } from "@mui/material";
import { VolumeOffOutlined, VolumeUpOutlined } from "@mui/icons-material";

const MuteItem = () => {
  const [isMute, setIsMute] = useState(isMuteFn());
  
  const handleMute = () => {
    isMute ? setMute(MuteStatus.false) : setMute(MuteStatus.true);
    setIsMute(prev => !prev);
  };

  return (
    <ListItem onClick={handleMute}>
      <Grid container gap={1} justifyContent="space-between" alignItems="center">
        Sound {isMute ? 'Off' : 'On'}
        {isMute ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
      </Grid>
    </ListItem>
  )
}

export default MuteItem