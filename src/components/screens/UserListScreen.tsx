import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

const users = [
  { id: 1, name: '管理者A', email: 'admin@example.com', role: 'admin', last_login: '2024-06-01' },
  { id: 2, name: '担当者B', email: 'agent@example.com', role: 'agent', last_login: '2024-06-10' },
];

const UserListScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>ユーザー管理</Typography>
      <Box mb={2}>
        <Button variant="contained" color="primary">新規登録</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>メールアドレス</TableCell>
              <TableCell>ロール</TableCell>
              <TableCell>最終ログイン</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.last_login}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">詳細</Button>
                    <Button size="small" variant="outlined">編集</Button>
                    <Button size="small" variant="outlined" color="error">削除</Button>
                    <Button size="small" variant="outlined">権限設定</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserListScreen; 