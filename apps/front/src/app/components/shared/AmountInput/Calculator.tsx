import React, { useState } from 'react';
import { Button, Grid, Paper, Stack, Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Parser } from 'expr-eval';
import { AddCircleOutlined, BackspaceOutlined, Cancel, RemoveCircleOutlined } from '@mui/icons-material';

const parser = new Parser();

type Props = {
  onResultValid: (value: string) => void;
};

const Calculator: React.FC<Props> = ({ onResultValid }) => {
  const [displayValue, setDisplayValue] = useState<string>('0');

  const evalPreview = (expression: string) => {
    try {
      const result = parser.evaluate(expression);
      onResultValid(result.toString());
      return result.toString();
    } catch (error) {
      console.log('error :>> ', error);
      return '-';
    }
  };

  const handleNumberClick = (number: string) => {
    setDisplayValue(prevValue => {
      const newValue = prevValue === '0' ? number : prevValue + number;
      evalPreview(newValue);
      return newValue;
    });
  };

  const handleOperatorClick = (operator: string) => {
    setDisplayValue(prevValue => {
      const lastChar = prevValue.charAt(prevValue.length - 1);
      if (isNaN(parseInt(lastChar))) {
        return prevValue.slice(0, -1) + operator;
      } else {
        const newValue = prevValue + operator;
        evalPreview(newValue);
        return newValue;
      }
    });
  };

  const handleReset = () => {
    setDisplayValue('0');
  };

  const handleDelete = () => {
    setDisplayValue(prevValue => {
      if (prevValue.length === 1) {
        return '0';
      } else {
        const newValue = prevValue.slice(0, -1);
        evalPreview(newValue);
        return newValue;
      }
    });
  };

  return (
    <Stack gap={4}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" overflow="auto">
          {displayValue}
        </Typography>
        <Typography variant="h6" color="text.disabled">
          {evalPreview(displayValue)}
        </Typography>
      </Paper>

      <Grid container justifyContent="center">
        <Grid item xs={9} md={6}>
          <Grid container justifyContent="center" gap={1}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <Button variant="contained" onClick={() => handleNumberClick(`${num}`)}>{num}</Button>
            ))}
            <Button variant="contained" color="error" onClick={() => handleReset()}>C</Button>
            <Button variant="contained" onClick={() => handleNumberClick('0')}>0</Button>
            <Button variant="contained" onClick={() => handleDelete()}><BackspaceOutlined /></Button>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Stack gap={1}>
            <Button variant="contained" onClick={() => handleOperatorClick('+')}><AddCircleOutlined /></Button>
            <Button variant="contained" onClick={() => handleOperatorClick('-')}><RemoveCircleOutlined /></Button>
            <Button variant="contained" onClick={() => handleOperatorClick('*')}><Cancel /></Button>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Calculator;
