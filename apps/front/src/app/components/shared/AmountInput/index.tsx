import { Chip, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import React, { FC, useRef, useState } from 'react';
import UnitHandler from './UnitHandler';

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

  const handleUnitChange = (newUnit: string, index: number) => {
    if (inputRef?.current) {
      const amountArray = amount.split('');
      amountArray[index] = newUnit;

      const newValue = amountArray.join('');
      inputRef.current.value = newValue;
      setAmount(newValue);
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
          max: 999999, // FIXME: not working
          maxLength: 6, // FIXME: not working
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

      <Grid container justifyContent="center" gap={2}>
        {amount.split('').map((unit, index) => (
          <UnitHandler
            key={index}
            unit={unit}
            onChange={(newUnit) => handleUnitChange(newUnit, index)}
          />
        ))}
      </Grid>

    </Stack>
  );
};

export default AmountInput;