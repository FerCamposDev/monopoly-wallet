import { Button, FormControlLabel, InputAdornment, Radio, RadioGroup, Stack, TextField } from "@mui/material"
import withAuth from "../../../hocs/withAuth";
import { PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { useGame } from "../../../context/game/useGame";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../commons/enums/routes.enum";
import PageLayout from "../../../components/shared/PageLayout";
import { PAYMENT_REASONS_OPTIONS } from "../../../commons/constants";
import { sounds } from "../../../commons/helpers/sounds";

const PayToBankPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player } = useGame();

  const onSuccess = () => {
    toast.success('Successful payment!');
    sounds.sent();
    navigate(Routes.Game);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const amount = formData.get('amount');
    const reason = formData.get('reason') as PaymentReason;

    actions.paymentToBank({
      amount: Number(amount?.toString()),
      from: player,
      reason,
    }, onSuccess);
  }

  return (
    <PageLayout title="Pay to Bank" backUrl={Routes.Game}>
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

export default withAuth(PayToBankPage);
