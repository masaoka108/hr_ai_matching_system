import React from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

const matches = [
  { id: 1, talent: '山田 太郎', project: 'React開発案件', score: 88, reason: 'スキルが高く要件に合致', status: '推薦済' },
  { id: 2, talent: '佐藤 花子', project: 'AWSインフラ構築', score: 75, reason: 'AWS経験豊富', status: '未推薦' },
];

const MatchListScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>マッチング結果一覧</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="人材名" size="small" />
          <TextField label="案件名" size="small" />
          <TextField label="マッチ度スコア" size="small" type="number" />
          <TextField label="ステータス" size="small" />
          <Button variant="contained">検索</Button>
          <Button variant="outlined">クリア</Button>
        </Stack>
      </Paper>
      <Box mb={2}>
        <Button variant="contained" color="primary">CSV出力</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>人材名</TableCell>
              <TableCell>案件名</TableCell>
              <TableCell>マッチ度スコア</TableCell>
              <TableCell>推薦理由</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match) => (
              <TableRow key={match.id}>
                <TableCell>{match.talent}</TableCell>
                <TableCell>{match.project}</TableCell>
                <TableCell>{match.score}</TableCell>
                <TableCell>{match.reason}</TableCell>
                <TableCell>{match.status}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined">詳細</Button>
                    <Button size="small" variant="outlined">手動推薦</Button>
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

export default MatchListScreen; 