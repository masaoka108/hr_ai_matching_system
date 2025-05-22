import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

const clients = [
  { id: 1, name: 'ABC株式会社', person: '鈴木一郎', email: 'suzuki@abc.co.jp', phone: '03-1234-5678', projects: 3 },
  { id: 2, name: 'XYZ合同会社', person: '田中花子', email: 'tanaka@xyz.co.jp', phone: '06-9876-5432', projects: 1 },
];

const ClientListScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>クライアント企業管理</Typography>
      <Box mb={2}>
        <Button variant="contained" color="primary">新規登録</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>企業名</TableCell>
              <TableCell>担当者</TableCell>
              <TableCell>連絡先</TableCell>
              <TableCell>案件数</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.person}</TableCell>
                <TableCell>{client.email} / {client.phone}</TableCell>
                <TableCell>{client.projects}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">詳細</Button>
                    <Button size="small" variant="outlined">編集</Button>
                    <Button size="small" variant="outlined" color="error">削除</Button>
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

export default ClientListScreen; 