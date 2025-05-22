import React from 'react';
import { Box, Typography, Paper, Stack, Button, Chip, Divider } from '@mui/material';

const dummyMatch = {
  talent: {
    name: '山田 太郎',
    skills: ['React', 'Node.js'],
    experience_years: 5,
    desired_rate: 800000,
  },
  project: {
    name: 'React開発案件',
    skills: ['React', 'TypeScript'],
    description: '自社サービスのフロントエンド開発',
  },
  score: 88,
  recommendation: 'スキルが要件に合致し、即戦力として期待できるため。',
  summary: '山田さんはReact案件に最適です。',
};

const MatchDetailScreen: React.FC = () => {
  const m = dummyMatch;
  return (
    <Box>
      <Typography variant="h4" gutterBottom>マッチング詳細</Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h6">人材情報</Typography>
          <Typography><b>氏名:</b> {m.talent.name}</Typography>
          <Typography><b>スキル:</b> {m.talent.skills.map(skill => <Chip key={skill} label={skill} sx={{ mr: 1 }} />)}</Typography>
          <Typography><b>経験年数:</b> {m.talent.experience_years}年</Typography>
          <Typography><b>希望単価:</b> {m.talent.desired_rate.toLocaleString()}円</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">案件情報</Typography>
          <Typography><b>案件名:</b> {m.project.name}</Typography>
          <Typography><b>必要スキル:</b> {m.project.skills.map(skill => <Chip key={skill} label={skill} sx={{ mr: 1 }} />)}</Typography>
          <Typography><b>業務内容:</b> {m.project.description}</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">マッチ度スコア: {m.score}</Typography>
          <Typography variant="h6">推薦理由（LLM生成）</Typography>
          <Typography>{m.recommendation}</Typography>
          <Typography variant="h6">要約</Typography>
          <Typography>{m.summary}</Typography>
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary">推薦実行</Button>
        <Button variant="contained">編集</Button>
        <Button variant="outlined" color="error">削除</Button>
      </Stack>
    </Box>
  );
};

export default MatchDetailScreen; 