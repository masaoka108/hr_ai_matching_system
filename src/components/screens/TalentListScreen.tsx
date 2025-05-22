'use client';
import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

interface Talent {
  id: number;
  name: string;
  skills: string;
  experience_years: number;
  desired_rate: number;
  available_from: string;
  status: string;
}

const TalentListScreen: React.FC = () => {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [search, setSearch] = useState({
    name: '',
    skills: '',
    experience_years: '',
    desired_rate: '',
    available_from: '',
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  const fetchTalents = async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) throw new Error('認証情報がありません。再度ログインしてください。');
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/talents${query ? `?${query}` : ''}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('データ取得に失敗しました');
      const result = await res.json();
      setTalents(result.data || []);
    } catch (e) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalents();
  }, []);

  const handleSearch = () => {
    const params: Record<string, string> = {};
    if (search.name) params.name = search.name;
    if (search.skills) params.skills = search.skills;
    if (search.experience_years) params.experience_years = search.experience_years;
    if (search.desired_rate) params.desired_rate = search.desired_rate;
    if (search.available_from) params.available_from = search.available_from;
    fetchTalents(params);
  };

  const handleClear = () => {
    setSearch({ name: '', skills: '', experience_years: '', desired_rate: '', available_from: '' });
    fetchTalents();
  };

  const handleDetail = (id: string) => {
    router.push(`/talents/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/talents/${id}/edit`);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('本当に削除しますか？')) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) throw new Error('認証情報がありません。再度ログインしてください。');
      const res = await fetch(`/api/talents/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) throw new Error('削除に失敗しました');
      fetchTalents();
    } catch (e) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材一覧</Typography>
      {/* 検索・絞り込みフォーム */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField label="氏名" name="name" size="small" value={search.name} onChange={handleSearchChange} />
          <TextField label="スキル" name="skills" size="small" value={search.skills} onChange={handleSearchChange} />
          <TextField label="経験年数" name="experience_years" size="small" type="number" value={search.experience_years} onChange={handleSearchChange} />
          <TextField label="希望単価" name="desired_rate" size="small" type="number" value={search.desired_rate} onChange={handleSearchChange} />
          <TextField label="稼働可能時期" name="available_from" size="small" type="date" InputLabelProps={{ shrink: true }} value={search.available_from} onChange={handleSearchChange} />
          <Button variant="contained" onClick={handleSearch}>検索</Button>
          <Button variant="outlined" onClick={handleClear}>クリア</Button>
        </Stack>
      </Paper>
      {/* 一覧テーブル */}
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/talents/new')}
        >
          新規登録
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
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
                  <TableCell>
                    {talent.desired_rate != null
                      ? `${talent.desired_rate.toLocaleString()}円`
                      : '-'}
                  </TableCell>
                  <TableCell>{talent.available_from}</TableCell>
                  <TableCell>{talent.status}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" onClick={() => handleDetail(talent.id.toString())}>詳細</Button>
                      <Button size="small" variant="outlined" onClick={() => handleEdit(talent.id.toString())}>編集</Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(talent.id.toString())}>削除</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TalentListScreen; 