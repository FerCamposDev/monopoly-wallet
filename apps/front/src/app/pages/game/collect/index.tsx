import { Button, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material"
import withAuth from "../../../hocs/withAuth";
import { IPaymentFromBank, PaymentReason } from "@monopoly-wallet/shared-types";
import { useGame } from "../../../context/game/useGame";
import PageLayout from "../../../components/shared/PageLayout";
import { PAYMENT_REASONS_OPTIONS } from "../../../commons/constants";
import AmountInput from "../../../components/shared/AmountInput";
import QRCode from 'qrcode';
import toast from "react-hot-toast";
import { useState } from "react";
import QRCodeModal from "../../../components/shared/QRCodeModal";


const CollectPage = () => {
  const { player } = useGame();
  const [qrCode, setQrCode] = useState<string>('');
  const [paymentData, setPaymentData] = useState<IPaymentFromBank>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);

    const data: IPaymentFromBank = {
      amount: Number(formData.get('amount')),
      reason: formData.get('reason') as PaymentReason,
      to: player,
    }

    try {
      const qr = await QRCode.toDataURL(JSON.stringify(data));
      setQrCode(qr);
      setPaymentData(data);
    } catch (error) {
      console.log('QR code error :>> ', error);
      toast.error('Failed to create qr code.');
    }
  }

  const reset = () => {
    setQrCode('');
    setPaymentData(undefined);
  }

  return (
    <PageLayout title="Pay to Bank">
      <QRCodeModal qrUrl={qrCode} paymentData={paymentData} onClose={reset} />
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
          <AmountInput />
        </Stack>
        <Button variant="contained" type="submit" sx={{ mt: 'auto' }}>
          Generate Code
        </Button>
      </form>
    </PageLayout>
  )
}

export default withAuth(CollectPage);
