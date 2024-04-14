import { Button, InputAdornment, Stack, TextField } from "@mui/material"
import PlayerSelector from "../../../components/shared/PlayerSelector"
import withAuth from "../../../hocs/withAuth";
import { useState } from "react";
import { IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { useGame } from "../../../context/game/useGame";

const TransferPage = () => {
  const { actions } = useGameSockets();
  const { game, player } = useGame();
  const [to, setTo] = useState<IPlayer | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');

    actions.paymentP2P(game!.room, {
      amount: Number(amount),
      from: player!,
      to: to!,
      reason: PaymentReason.BUILD
    });
  }

  return (
    <Stack sx={{ p: 2 }}>
      <form onSubmit={handleSubmit}>
        <PlayerSelector onSelect={setTo} />
        <TextField
          type="number"
          name="amount"
          fullWidth
          required
          inputProps={{
            min: 1,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}
        />
        <Button type="submit">
          Transfer
        </Button>
      </form>
    </Stack>
  )
}

export default withAuth(TransferPage);
