import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, Chip } from '@mui/material';

const notifications = [
  { id: 1, content: '新規案件「Pythonデータ分析」登録', date: '2024-06-20', target: '案件', is_read: false },
  { id: 2, content: '人材「田中一郎」稼働可能時期が近づいています', date: '2024-06-19', target: '人材', is_read: true },
];

const NotificationScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>通知・アラート</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>通知内容</TableCell>
              <TableCell>発生日時</TableCell>
              <TableCell>対象</TableCell>
              <TableCell>既読・未読</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((n) => (
              <TableRow key={n.id}>
                <TableCell>{n.content}</TableCell>
                <TableCell>{n.date}</TableCell>
                <TableCell>{n.target}</TableCell>
                <TableCell>
                  {n.is_read ? <Chip label="既読" color="success" /> : <Chip label="未読" color="warning" />}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">詳細</Button>
                    {!n.is_read && <Button size="small" variant="contained">既読にする</Button>}
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

export default NotificationScreen; 