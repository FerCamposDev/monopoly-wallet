import { CircularProgress, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  detail?: string;
};

const LoadingModal: FC<Props> = ({ title = 'Loading', message, open, detail }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <Stack width="100%" alignItems="center" gap={4}>
          <CircularProgress />
          {message && (
            <Typography variant="h5" textAlign="center">
              {message}
            </Typography>
          )}
          {detail && (
            <Typography variant="h6" textAlign="center">
              {detail}
            </Typography>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingModal;