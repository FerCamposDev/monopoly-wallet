import { IconButton, IconButtonProps, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface Props extends IconButtonProps {
  text: string;
}

const IconButtonText: FC<Props> = ({ text, children, ...iconButtonProps }) => {
  return (
    <IconButton color="primary" {...iconButtonProps}>
      <Stack alignItems="center">
        {children}
        <Typography variant="caption">
          {text}
        </Typography>
      </Stack>
    </IconButton>
  );
};

export default IconButtonText;