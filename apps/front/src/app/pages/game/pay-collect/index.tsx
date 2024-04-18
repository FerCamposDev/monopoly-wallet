import { Button, Stack } from "@mui/material"
import withAuth from "../../../hocs/withAuth";
import { IP2PPayment, IPaymentFromBank } from "@monopoly-wallet/shared-types";
import { useGame } from "../../../context/game/useGame";
import { Routes } from "../../../commons/enums/routes.enum";
import PageLayout from "../../../components/shared/PageLayout";
import { useEffect, useRef, useState } from "react";
import QrScanner from 'qr-scanner'; // if installed via package and bundling with a module bundler like webpack or rollup
import { useGameSockets } from "../../../context/sockets/useGameSockets";
import toast from "react-hot-toast";
import { sounds } from "../../../commons/helpers/sounds";
import { useNavigate } from "react-router-dom";

const PayCollectPage = () => {
  const navigate = useNavigate();
  const { player } = useGame();
  const { actions } = useGameSockets();

  const [paymentData, setPaymentData] = useState<IP2PPayment>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onSuccess = () => {
    toast.success('Successful transfer!');
    sounds.sent();
    navigate(Routes.Game);
  }

  const handleSend = () => {
    if (paymentData) {
      setPaymentData(undefined);
      actions.paymentP2P(paymentData, onSuccess)
    }
  }

  useEffect(() => {
    let qrScanner: QrScanner;

    if (videoRef?.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        result => {
          console.log('decoded qr code:', result);
          const jsonData = JSON.parse(result.data) as IPaymentFromBank;
          if (jsonData) {
            setPaymentData({
              ...jsonData,
              from: player,
            })
          }
          qrScanner.destroy();
        },
        {
          highlightCodeOutline: true,
          highlightScanRegion: true,
          onDecodeError: (error) => console.log('error :>> ', error),
        }
      );
      qrScanner.start();
      console.log('qrScanner :>> ', qrScanner);
    }

    return () => qrScanner?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageLayout title="Transfer Collect" backUrl={Routes.Game}>
      <Stack gap={4}>
        <video ref={videoRef} style={{ display: paymentData ? 'none' : 'flex' }}></video>
        <pre>
          {JSON.stringify(paymentData, null, 2)}
        </pre>
      </Stack>
      {paymentData && (
        <Button variant="contained" onClick={handleSend} sx={{ mt: 'auto' }}>
          Send Payment
        </Button>
      )}
    </PageLayout>
  )
}

export default withAuth(PayCollectPage);
