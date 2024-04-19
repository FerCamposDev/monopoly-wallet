import { CircularProgress, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { FC } from "react";

type Props = {
  message?: string;
  open: boolean;
}

const LoadingModal: FC<Props> = ({ message, open }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        Loading
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" gap={4}>
          <CircularProgress />
          <Typography variant="h5">
            {message}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingModal