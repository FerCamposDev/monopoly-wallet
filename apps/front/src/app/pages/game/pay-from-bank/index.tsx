import { Button, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import PlayerSelector from '../../../components/shared/PlayerSelector';
import withAuth from '../../../hocs/withAuth';
import { useState } from 'react';
import { IPlayer, PaymentReason } from '@monopoly-wallet/shared-types';
import { useGameSockets } from '../../../context/sockets/useGameSockets';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../components/shared/PageLayout';
import { BANK_PAYMENT_REASONS_OPTIONS } from '../../../commons/constants';
import { sounds } from '../../../commons/helpers/sounds';
import AmountInput from '../../../components/shared/AmountInput';

const PayFromBankPage = () => {
  const navigate = useNavigate();
  const { actions } = useGameSockets();
  const [to, setTo] = useState<IPlayer>();

  const onSuccess = () => {
    toast.success('Successful transfer!');
    sounds.bankSent();
    navigate(-1);
  };

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
  };

  return (
    <PageLayout title="Pay From Bank">
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
          <RadioGroup name="reason" defaultValue={PaymentReason.START}>
            {BANK_PAYMENT_REASONS_OPTIONS.map((reason) => (
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
        <Button variant="contained" color="secondary" type="submit" sx={{ mt: 'auto' }}>
          Pay
        </Button>
      </form>
    </PageLayout>
  );
};

export default withAuth(PayFromBankPage);
