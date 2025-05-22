'use client';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link, Paper, Stack, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError('ログインに失敗しました。メールアドレスまたはパスワードを確認してください。');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ p: 4, width: 350, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>ログイン</Typography>
        <Stack spacing={2}>
          <TextField label="メールアドレス" type="email" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="パスワード" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>ログイン</Button>
          <Link href="#" underline="hover" variant="body2" alignSelf="flex-end">
            パスワードを忘れた場合
          </Link>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Paper>
    </Box>
  );
};

export default LoginScreen; 