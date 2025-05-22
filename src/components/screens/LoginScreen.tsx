import React from 'react';
import { Box, Button, TextField, Typography, Link, Paper, Stack } from '@mui/material';

const LoginScreen: React.FC = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" gutterBottom>ログイン</Typography>
        <Stack spacing={2}>
          <TextField label="メールアドレス" type="email" fullWidth />
          <TextField label="パスワード" type="password" fullWidth />
          <Button variant="contained" color="primary" fullWidth>ログイン</Button>
          <Link href="#" underline="hover" variant="body2" alignSelf="flex-end">
            パスワードを忘れた場合
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginScreen; 