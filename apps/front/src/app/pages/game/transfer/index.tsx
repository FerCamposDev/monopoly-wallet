import { Button, FormControlLabel, Grid, Radio, RadioGroup, Stack, Switch } from "@mui/material"
import PlayerSelector from "../../../components/shared/PlayerSelector"
import withAuth from "../../../hocs/withAuth";
import { ChangeEvent, useState } from "react";
import { IPlayer, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import { useGame } from "../../../context/game/useGame";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../../components/shared/PageLayout";
import { PAYMENT_REASONS_OPTIONS } from "../../../commons/constants";
import { sounds } from "../../../commons/helpers/sounds";
import AmountInput from "../../../components/shared/AmountInput";

const TransferPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player, game } = useGame();
  const [to, setTo] = useState<IPlayer>();
  const [paymentToAll, setPaymentToAll] = useState(false);

  const onSuccess = (to: IPlayer, isLast = true) => {
    toast.success(`Successful transfer to ${to.token}!`);
    sounds.sent();
    if (isLast) {
      navigate(-1);
    }
  }

  const payToAll = (amount: number, reason: PaymentReason) => {
    const otherPlayers = game.players.filter(p => p.token !== player.token);

    otherPlayers.forEach((to, index) => {
      const isLast = index + 1 === otherPlayers.length;

      setTimeout(() => {
        actions.paymentP2P({
          from: player,
          to,
          amount,
          reason,
        }, () => onSuccess(to, isLast));
      }, index * 1000);
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const amount = Number(formData.get('amount'));
    const reason = formData.get('reason') as PaymentReason;

    if (paymentToAll) {
      return payToAll(amount, reason);
    }

    if (!to) return;

    actions.paymentP2P({
      amount: Number(amount?.toString()),
      from: player,
      to,
      reason,
    }, () => onSuccess(to));
  }

  const handleCheckToAll = (_e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setPaymentToAll(checked);
  }

  const renderPaymentToAll = () => (
    <FormControlLabel
      label="To All"
      labelPlacement="top"
      control={
        <Switch checked={paymentToAll} onChange={handleCheckToAll} />
      }
    />
  )

  return (
    <PageLayout title="Transfer">
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
          <Grid container justifyContent="space-between">
            <Grid item xs={8.9}>
              <PlayerSelector onSelect={setTo} disabled={paymentToAll} />
            </Grid>
            {renderPaymentToAll()}
          </Grid>
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
