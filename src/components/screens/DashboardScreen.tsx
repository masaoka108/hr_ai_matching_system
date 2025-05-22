import React from 'react';
import { Box, Typography, Grid, Paper, Button, List, ListItem, ListItemText, Stack } from '@mui/material';

const kpis = [
  { label: '成約率', value: '78%' },
  { label: '案件充足率', value: '92%' },
  { label: 'マッチング件数', value: '120件' },
];

const latestMatches = [
  { id: 1, talent: '山田 太郎', project: 'React開発案件', score: 88 },
  { id: 2, talent: '佐藤 花子', project: 'AWSインフラ構築', score: 75 },
];

const alerts = [
  '新規案件「Pythonデータ分析」登録',
  '人材「田中一郎」稼働可能時期が近づいています',
];

const DashboardScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>ダッシュボード</Typography>
      <Grid container spacing={2} mb={3}>
        {kpis.map((kpi) => (
          <Grid item xs={12} sm={4} key={kpi.label}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">{kpi.label}</Typography>
              <Typography variant="h5" color="primary">{kpi.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>最新マッチング結果</Typography>
            <List>
              {latestMatches.map((m) => (
                <ListItem key={m.id}>
                  <ListItemText primary={`${m.talent} × ${m.project}`} secondary={`マッチ度: ${m.score}`}/>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>アラート</Typography>
            <List>
              {alerts.map((alert, i) => (
                <ListItem key={i}>
                  <ListItemText primary={alert} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button variant="contained" color="primary">レポート出力</Button>
      </Stack>
    </Box>
  );
};

export default DashboardScreen; 