import { Button, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, TextField } from "@mui/material"
import PlayerSelector from "../../../components/shared/PlayerSelector"
import withAuth from "../../../hocs/withAuth";
import { useState } from "react";
import { IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../commons/enums/routes.enum";
import PageLayout from "../../../components/shared/PageLayout";
import { PAYMENT_REASONS_OPTIONS } from "../../../commons/constants";
import { sounds } from "../../../commons/helpers/sounds";

const PayFromBankPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const [to, setTo] = useState<IPlayer>();

  const onSuccess = () => {
    toast.success('Successful transfer!');
    sounds.bankSent();
    navigate(Routes.Game);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!to) return;
    
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');
    const reason = formData.get('reason') as PaymentReason;

    actions.paymentToPlayer({
      amount: Number(amount?.toString()),
      to,
      reason,
    }, onSuccess);
  }

  return (
    <PageLayout title="Pay From Bank" backUrl={Routes.Game}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
        onSubmit={handleSubmit}
      >
        <Stack gap={4}>
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
        </Stack>
        <Button variant="contained" type="submit" sx={{ mt: 'auto' }}>
          Pay
        </Button>
      </form>
    </PageLayout>
  )
}

export default withAuth(PayFromBankPage);
