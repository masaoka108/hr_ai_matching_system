import React from 'react';
import { Box, Typography, Paper, Stack, Button, Chip } from '@mui/material';

const dummyTalent = {
  name: '山田 太郎',
  contact: 'taro.yamada@example.com',
  skills: ['React', 'Node.js', 'TypeScript'],
  experience_years: 5,
  desired_rate: 800000,
  work_style: 'リモート',
  available_from: '2024-07-01',
  notes: 'リーダー経験あり',
  resume_url: 'https://example.com/resume.pdf',
};

const TalentDetailScreen: React.FC = () => {
  const t = dummyTalent;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材詳細</Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Typography><b>氏名:</b> {t.name}</Typography>
          <Typography><b>連絡先:</b> {t.contact}</Typography>
          <Typography><b>スキルセット:</b> {t.skills.map(skill => <Chip key={skill} label={skill} sx={{ mr: 1 }} />)}</Typography>
          <Typography><b>経験年数:</b> {t.experience_years}年</Typography>
          <Typography><b>希望単価:</b> {t.desired_rate.toLocaleString()}円</Typography>
          <Typography><b>希望稼働形態:</b> {t.work_style}</Typography>
          <Typography><b>稼働可能時期:</b> {t.available_from}</Typography>
          <Typography><b>備考:</b> {t.notes}</Typography>
          <Typography>
            <b>履歴書ファイル:</b> <a href={t.resume_url} target="_blank" rel="noopener noreferrer">ダウンロード</a>
          </Typography>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">編集</Button>
        <Button variant="outlined" color="error">削除</Button>
        <Button variant="contained" color="secondary">案件マッチング実行</Button>
      </Stack>
    </Box>
  );
};

export default TalentDetailScreen; 