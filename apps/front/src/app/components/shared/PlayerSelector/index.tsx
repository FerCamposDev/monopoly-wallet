import { Avatar, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { FC } from 'react';
import { useGame } from '../../../context/game/useGame';
import { IPlayer } from '@monopoly-wallet/shared-types';
import { getTokenImagePath } from '../../../commons/helpers/images';

type Props = {
  onSelect: (player: IPlayer) => void;
  disabled?: boolean;
};

const PlayerSelector: FC<Props> = ({ onSelect, disabled }) => {
  const { game, player } = useGame();

  const players = game?.players.filter(p => p.token !== player?.token);

  if (players.length === 1) {
    onSelect(players[0]);
  }

  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="player-select-label" disabled={disabled}>
        Select Player
      </InputLabel>
      <Select
        labelId="player-select-label"
        label="Select Player"
        name="player"
        defaultValue={players.length === 1 ? players[0].token : ''}
        required={!disabled}
        disabled={disabled}
      >
        {players?.map(p => (
          <MenuItem key={p.token} onClick={() => onSelect(p)} value={p.token}>
            <Grid container gap={2} alignItems="center">
              <Avatar
                alt="player-token"
                src={getTokenImagePath(p.token)}
                sx={{ height: 24, width: 24 }}
              />
              {p.name}
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlayerSelector;