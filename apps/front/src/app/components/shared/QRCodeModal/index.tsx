import { IPaymentFromBank } from '@monopoly-wallet/shared-types';
import { Close } from '@mui/icons-material';
import { AppBar, Button, Dialog, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentDetail from '../PaymentDetail';
import { useDevices } from '../../../hooks';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  qrUrl?: string;
  paymentData?: IPaymentFromBank;
  onClose: () => void;
};

const QRCodeModal: FC<Props> = ({ qrUrl, paymentData, onClose }) => {
  const { isMobile } = useDevices();

  const navigate = useNavigate();

  const handleFinish = () => {
    navigate(-1);
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={Boolean(qrUrl)}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Scan To Pay
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Stack height="100%" width="100%" justifyContent="space-between" sx={{ p: 2 }}>
        <img
          alt="QR-Code"
          src={qrUrl}
        />

        <PaymentDetail payment={paymentData} />

        <Button autoFocus variant="contained" onClick={handleFinish} sx={{ mt: 2 }}>
          Finish
        </Button>
      </Stack>
    </Dialog>
  );
};

export default QRCodeModal;