import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { FC } from "react"
import { useGame } from "../../../context/game/useGame"
import { IPlayer } from "@monopoly-wallet/shared-types"

type Props = {
  onSelect: (player: IPlayer) => void;
}

const PlayerSelector: FC<Props> = ({ onSelect }) => {
  const { game, player } = useGame();

  const players = game?.players.filter(p => p.token !== player?.token);

  return (
    <FormControl fullWidth>
      <InputLabel id="player-select-label">Select Player</InputLabel>
      <Select
        labelId="player-select-label"
        label="Select Player"
        name="player"
        defaultValue={''}
        required
      >
        {players?.map(p => (
          <MenuItem
            key={p.token}
            onClick={() => onSelect(p)}
            value={p.token}>
            {p.token}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default PlayerSelector