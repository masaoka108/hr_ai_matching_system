import React from 'react';
import LoginScreen from '../components/screens/LoginScreen';
import { Box } from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <LoginScreen />
    </Box>
  );
} 