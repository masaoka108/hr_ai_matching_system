import React from 'react';
import { Box, Typography, Paper, Stack, TextField, Button } from '@mui/material';

const ProjectFormScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>案件登録・編集</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          <TextField label="案件名" fullWidth required />
          <TextField label="クライアント企業名" fullWidth />
          <TextField label="必要スキル（カンマ区切り）" fullWidth />
          <TextField label="業務内容" fullWidth multiline minRows={2} />
          <TextField label="勤務地" fullWidth />
          <TextField label="報酬" type="number" fullWidth />
          <TextField label="稼働開始日" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="備考" fullWidth multiline minRows={2} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary">登録/更新</Button>
            <Button variant="outlined">キャンセル</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProjectFormScreen; 