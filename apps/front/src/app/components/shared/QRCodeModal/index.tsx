import { IPaymentFromBank } from '@monopoly-wallet/shared-types';
import { Close } from '@mui/icons-material';
import { AppBar, Button, Dialog, IconButton, Slide, Stack, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { FC, forwardRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentDetail from '../PaymentDetail';

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
}

const QRCodeModal: FC<Props> = ({ qrUrl, paymentData, onClose }) => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate(-1);
  }

  return (
    <Dialog
      fullScreen
      open={Boolean(qrUrl)}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Scan To Pay
          </Typography>
          <Button color="inherit" onClick={onClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <Stack height="100%" justifyContent="space-between" sx={{ p: 2 }}>
        <img
          alt="QR-Code"
          src={qrUrl}
        />

        <PaymentDetail payment={paymentData} />

        <Button autoFocus variant="contained" onClick={handleFinish}>
          Finish
        </Button>
      </Stack>
    </Dialog>
  )
}

export default QRCodeModal