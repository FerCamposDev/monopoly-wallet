import { CalculateOutlined, Close } from '@mui/icons-material';
import { AppBar, Button, Dialog, DialogContent, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useDevices, useToggle } from '../../../hooks';
import Calculator from './Calculator';

type Props = {
  onFinish: (value: string) => void;
};

const ModalCalculator: FC<Props> = ({ onFinish }) => {
  const { open, handleOpen, handleClose } = useToggle();
  const { isMobile } = useDevices();

  const [result, setResult] = useState('');

  const handleFinish = () => {
    onFinish(result);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <CalculateOutlined />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullScreen={isMobile}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Calculator
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Stack height="100%" gap={8}>
            <Calculator onResultValid={setResult} />
            <Button variant="contained" onClick={handleFinish} sx={{ mt: 'auto' }}>Finish</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalCalculator;