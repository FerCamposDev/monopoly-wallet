import { Button, InputAdornment, Stack, TextField } from "@mui/material"
import PlayerSelector from "../../../components/shared/PlayerSelector"
import withAuth from "../../../hocs/withAuth";
import { useState } from "react";
import { IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { useGame } from "../../../context/game/useGame";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../../commons/enums/routes.enum";

const TransferPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player } = useGame();
  const [to, setTo] = useState<IPlayer | null>(null);
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');

    actions.paymentP2P({
      amount: Number(amount),
      from: player!,
      to: to!,
      reason: PaymentReason.BUILD
    });
    toast.success('Successful transfer!');
    navigate(Routes.Game);
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
