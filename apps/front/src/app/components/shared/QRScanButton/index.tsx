import { QrCode } from "@mui/icons-material";
import { Fab, styled } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../commons/enums/routes.enum";

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  bottom: 10,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const QRScanButton: FC = () => {
  const navigate = useNavigate();

  const handleGoToScan = () => {
    navigate(Routes.GamePayCollect);
  }

  return (
    <StyledFab color="primary" onClick={handleGoToScan}>
      <QrCode fontSize="large" />
    </StyledFab>
  )
}

export default QRScanButton