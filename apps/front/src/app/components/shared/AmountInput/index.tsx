import { Chip, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import React, { FC, useRef, useState } from 'react';

const COMMON_VALUES = ['10', '20', '25', '30', '40', '50', '75', '100', '150', '200', '250', '400', '450'];

const AmountInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState('');

  const handleInputValue = (value: string) => {
    if (inputRef?.current) {
      inputRef.current.value = value;
      setAmount(value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  return (
    <Stack gap={1}>
      <TextField
        type="number"
        name="amount"
        fullWidth
        required
        onChange={handleChange}
        inputProps={{
          min: 1,
          ref: inputRef,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <Grid container gap={1} justifyContent="center">
        {COMMON_VALUES.map(value => (
          <Chip
            key={value}
            label={value}
            variant="outlined"
            color={amount === value ? 'primary' : 'default'}
            size="small"
            onClick={() => handleInputValue(value)}
          />
        ))}
      </Grid>
    </Stack>
  );
};

export default AmountInput;