import React from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';

const projects = [
  { id: 1, name: 'React開発案件', client: 'ABC株式会社', skills: 'React, TypeScript', location: '東京', reward: 900000, start_date: '2024-08-01', status: '募集中' },
  { id: 2, name: 'AWSインフラ構築', client: 'XYZ合同会社', skills: 'AWS, Python', location: 'リモート', reward: 850000, start_date: '2024-09-01', status: '募集中' },
];

const ProjectListScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>案件一覧</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="案件名" size="small" />
          <TextField label="クライアント企業名" size="small" />
          <TextField label="必要スキル" size="small" />
          <TextField label="勤務地" size="small" />
          <TextField label="報酬" size="small" type="number" />
          <Button variant="contained">検索</Button>
          <Button variant="outlined">クリア</Button>
        </Stack>
      </Paper>
      <Box mb={2}>
        <Button variant="contained" color="primary">新規登録</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>案件名</TableCell>
              <TableCell>クライアント企業名</TableCell>
              <TableCell>必要スキル</TableCell>
              <TableCell>勤務地</TableCell>
              <TableCell>報酬</TableCell>
              <TableCell>稼働開始日</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{project.skills}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.reward.toLocaleString()}円</TableCell>
                <TableCell>{project.start_date}</TableCell>
                <TableCell>{project.status}</TableCell>
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

export default ProjectListScreen; 