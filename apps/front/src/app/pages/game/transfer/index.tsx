import { Button, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material"
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
import { sounds } from "../../../commons/helpers/sounds";
import AmountInput from "../../../components/shared/AmountInput";

const TransferPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player } = useGame();
  const [to, setTo] = useState<IPlayer>();

  const onSuccess = () => {
    toast.success('Successful transfer!');
    sounds.sent();
    navigate(Routes.Game);
  }

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
    }, onSuccess);
  }
  
  return (
    <PageLayout title="Transfer" backUrl={Routes.Game}>
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
          <AmountInput />
        </Stack>
        <Button variant="contained" type="submit" sx={{ mt: 'auto' }}>
          Transfer
        </Button>
      </form>
    </PageLayout>
  )
}

export default withAuth(TransferPage);
