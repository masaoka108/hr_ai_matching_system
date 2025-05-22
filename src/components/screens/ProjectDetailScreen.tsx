import React from 'react';
import { Box, Typography, Paper, Stack, Button, Chip } from '@mui/material';

const dummyProject = {
  name: 'React開発案件',
  client: 'ABC株式会社',
  skills: ['React', 'TypeScript'],
  description: '自社サービスのフロントエンド開発',
  location: '東京',
  reward: 900000,
  start_date: '2024-08-01',
  notes: 'リモート可',
};

const ProjectDetailScreen: React.FC = () => {
  const p = dummyProject;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>案件詳細</Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Typography><b>案件名:</b> {p.name}</Typography>
          <Typography><b>クライアント企業名:</b> {p.client}</Typography>
          <Typography><b>必要スキル:</b> {p.skills.map(skill => <Chip key={skill} label={skill} sx={{ mr: 1 }} />)}</Typography>
          <Typography><b>業務内容:</b> {p.description}</Typography>
          <Typography><b>勤務地:</b> {p.location}</Typography>
          <Typography><b>報酬:</b> {p.reward.toLocaleString()}円</Typography>
          <Typography><b>稼働開始日:</b> {p.start_date}</Typography>
          <Typography><b>備考:</b> {p.notes}</Typography>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">編集</Button>
        <Button variant="outlined" color="error">削除</Button>
        <Button variant="contained" color="secondary">人材マッチング実行</Button>
      </Stack>
    </Box>
  );
};

export default ProjectDetailScreen; 