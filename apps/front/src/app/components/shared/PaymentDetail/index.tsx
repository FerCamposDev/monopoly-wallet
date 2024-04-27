import { IP2PPayment, IPaymentFromBank } from '@monopoly-wallet/shared-types';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { getTokenImagePath } from '../../../commons/helpers/images';
import Item from './Item';

function isP2PPayment(payment: IP2PPayment | IPaymentFromBank): payment is IP2PPayment {
  return 'from' in payment;
}

type Props = {
  payment?: IP2PPayment | IPaymentFromBank;
};

const PaymentDetail: FC<Props> = ({ payment }) => {
  if (!payment) return null;

  return (
    <Stack gap={4}>
      <Stack>
        <Typography variant='h5' textAlign="center">
          Receiver
        </Typography>
        <Grid container gap={2} justifyContent="center" alignItems="center">
          <Avatar
            src={getTokenImagePath(payment.to.token)}
            alt='token'
          />
          <Typography variant='subtitle1'>
            {payment.to.name}
          </Typography>
        </Grid>
      </Stack>

      <Stack>
        <Item label='Amount' value={`$ ${payment.amount.toLocaleString()}`} />
        <Item label='Reason' value={payment.reason} />
      </Stack>

      {isP2PPayment(payment) && (
        <Typography variant='h6' textAlign="center">
          Your Balance: $ {payment.from.balance.toLocaleString()}
        </Typography>
      )}
    </Stack>
  );
};

export default PaymentDetail;