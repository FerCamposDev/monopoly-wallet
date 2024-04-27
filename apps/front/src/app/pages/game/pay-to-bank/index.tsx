import { Button, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import withAuth from '../../../hocs/withAuth';
import { PaymentReason } from '@monopoly-wallet/shared-types';
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import { useGame } from '../../../context/game/useGame';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/shared/PageLayout';
import { TO_BANK_PAYMENT_REASONS_OPTIONS } from '../../../commons/constants';
import { sounds } from '../../../commons/helpers/sounds';
import AmountInput from '../../../components/shared/AmountInput';

const PayToBankPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const { player } = useGame();

  const onSuccess = () => {
    toast.success('Successful payment!');
    sounds.sent();
    navigate(-1);
  };

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
  };

  return (
    <PageLayout title="Pay to Bank">
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
          <RadioGroup name="reason" defaultValue={PaymentReason.BUY_PROPERTY}>
            {TO_BANK_PAYMENT_REASONS_OPTIONS.map((reason) => (
              <FormControlLabel
                key={reason.value}
                control={<Radio required />}
                value={reason.value}
                label={reason.label}
              />
            ))}
          </RadioGroup>
          <AmountInput />
        </Stack>
        <Button variant="contained" type="submit" sx={{ mt: 'auto' }}>
          Pay
        </Button>
      </form>
    </PageLayout>
  );
};

export default withAuth(PayToBankPage);
