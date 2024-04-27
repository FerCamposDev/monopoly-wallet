import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { FC } from 'react';

type Props = {
  unit: string;
  onChange: (newUnit: string) => void;
};

const UnitHandler: FC<Props> = ({ unit, onChange }) => {

  const increment = () => {
    if (unit === '9') return;
    const newUnit = Number(unit) + 1;
    onChange(newUnit.toString());
  };

  const decrement = () => {
    if (unit === '0') return;
    const newUnit = Number(unit) - 1;
    onChange(newUnit.toString());
  };

  return (
    <Stack alignItems="center">
      <IconButton onClick={increment} color="primary">
        <AddOutlined />
      </IconButton>
      <Typography variant="h6" border="solid 1px" borderRadius={1} px={1}>
        {unit}
      </Typography>
      <IconButton onClick={decrement} color="primary">
        <RemoveOutlined />
      </IconButton>
    </Stack>
  );
};

export default UnitHandler;