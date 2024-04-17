import { Button, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, TextField } from "@mui/material"
import PlayerSelector from "../../../components/shared/PlayerSelector"
import withAuth from "../../../hocs/withAuth";
import { useState } from "react";
import { IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { useGame } from "../../../context/game/useGame";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../commons/enums/routes.enum";
import PageLayout from "../../../components/shared/PageLayout";
import { PAYMENT_REASONS_OPTIONS } from "../../../commons/constants";

const TransferPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player } = useGame();
  const [to, setTo] = useState<IPlayer>();


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!to) return;
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');
    const reason = formData.get('reason') as PaymentReason;

    actions.paymentP2P({
      amount: Number(amount?.toString()),
      from: player,
      to,
      reason,
    });
    toast.success('Successful transfer!');
    navigate(Routes.Game);
  }

  return (
    <PageLayout title="Transfer" backUrl={Routes.Game}>
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <FormControl required>
            <RadioGroup name="reason">
              {PAYMENT_REASONS_OPTIONS.map((reason) => (
                <FormControlLabel
                  key={reason.value}
                  control={<Radio required />}
                  value={reason.value}
                  label={reason.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
          <Button variant="contained" type="submit">
            Transfer
          </Button>
        </Stack>
      </form>
    </PageLayout>
  )
}

export default withAuth(TransferPage);
