import React from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, MenuItem } from '@mui/material';

const TalentFormScreen: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材登録・編集</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          <TextField label="氏名" fullWidth required />
          <TextField label="連絡先" fullWidth />
          <TextField label="スキルセット（カンマ区切り）" fullWidth />
          <TextField label="経験年数" type="number" fullWidth />
          <TextField label="希望単価" type="number" fullWidth />
          <TextField
            label="希望稼働形態"
            select
            fullWidth
            defaultValue=""
          >
            <MenuItem value="常駐">常駐</MenuItem>
            <MenuItem value="リモート">リモート</MenuItem>
            <MenuItem value="ハイブリッド">ハイブリッド</MenuItem>
          </TextField>
          <TextField label="稼働可能時期" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="備考" fullWidth multiline minRows={2} />
          <Button variant="outlined" component="label">
            履歴書ファイル添付
            <input type="file" hidden />
          </Button>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary">登録/更新</Button>
            <Button variant="outlined">キャンセル</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TalentFormScreen; 