import React from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

// ダミーデータ
const talents = [
  { id: 1, name: '山田 太郎', skills: 'React, Node.js', experience_years: 5, desired_rate: 800000, available_from: '2024-07-01', status: 'アクティブ' },
  { id: 2, name: '佐藤 花子', skills: 'Python, AWS', experience_years: 3, desired_rate: 600000, available_from: '2024-08-01', status: 'アクティブ' },
];

const TalentListScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材一覧</Typography>
      {/* 検索・絞り込みフォーム */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="氏名" size="small" />
          <TextField label="スキル" size="small" />
          <TextField label="経験年数" size="small" type="number" />
          <TextField label="希望単価" size="small" type="number" />
          <TextField label="稼働可能時期" size="small" type="date" InputLabelProps={{ shrink: true }} />
          <Button variant="contained">検索</Button>
          <Button variant="outlined">クリア</Button>
        </Stack>
      </Paper>
      {/* 一覧テーブル */}
      <Box mb={2}>
        <Button variant="contained" color="primary">新規登録</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>スキルセット</TableCell>
              <TableCell>経験年数</TableCell>
              <TableCell>希望単価</TableCell>
              <TableCell>稼働可能時期</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {talents.map((talent) => (
              <TableRow key={talent.id}>
                <TableCell>{talent.name}</TableCell>
                <TableCell>{talent.skills}</TableCell>
                <TableCell>{talent.experience_years}年</TableCell>
                <TableCell>{talent.desired_rate.toLocaleString()}円</TableCell>
                <TableCell>{talent.available_from}</TableCell>
                <TableCell>{talent.status}</TableCell>
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

export default TalentListScreen; 