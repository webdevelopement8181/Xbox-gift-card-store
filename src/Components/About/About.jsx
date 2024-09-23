import React from 'react';
import { Button, Typography, Paper } from '@mui/material';

const Sample = () => {
  return (
    <Paper sx={{ padding: '20px', margin: '20px', textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ color: '#333', marginBottom: '15px' }}
      >
        Hello from Sample Component
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: '16px', padding: '10px 20px' }}
      >
        Click Me
      </Button>
    </Paper>
  );
};

export default Sample;
