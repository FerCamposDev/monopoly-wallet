import { Grid, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  label: string;
  value: ReactNode
};

const Item: FC<Props> = ({ label, value }) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Typography variant='body2'>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight="700">
        {value}
      </Typography>
    </Grid>
  );
};

export default Item;