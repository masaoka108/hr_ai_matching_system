import React from 'react';
import { Box, Typography, Paper, Stack, Button, TextField, Grid } from '@mui/material';

const ReportScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>レポート・分析</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField label="開始日" type="date" InputLabelProps={{ shrink: true }} size="small" />
          <TextField label="終了日" type="date" InputLabelProps={{ shrink: true }} size="small" />
          <Button variant="contained">期間指定</Button>
          <Button variant="outlined">CSV出力</Button>
        </Stack>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">成約率グラフ（ダミー）</Typography>
            <Box sx={{ height: 180, background: '#eee', borderRadius: 2, mt: 2 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">案件充足率グラフ（ダミー）</Typography>
            <Box sx={{ height: 180, background: '#eee', borderRadius: 2, mt: 2 }} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">期間別マッチング件数グラフ（ダミー）</Typography>
            <Box sx={{ height: 180, background: '#eee', borderRadius: 2, mt: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportScreen; 