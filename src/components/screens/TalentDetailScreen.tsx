'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Stack, Button, Chip, CircularProgress, Alert } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

interface Talent {
  id: string;
  name: string;
  contact: string;
  skills: string[];
  experience_years: number | null;
  desired_rate: number | null;
  work_style: string;
  available_from: string;
  notes: string;
  resume_url?: string;
}

const TalentDetailScreen: React.FC = () => {
  const [talent, setTalent] = useState<Talent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true);
      setError('');
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token;
        if (!accessToken) throw new Error('認証情報がありません。再度ログインしてください。');
        const res = await fetch(`/api/talents/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error('データ取得に失敗しました');
        const data = await res.json();
        setTalent(data);
      } catch (e: any) {
        setError(e.message || 'エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTalent();
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!talent) return null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材詳細</Typography>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Stack spacing={2}>
          <Typography><b>氏名:</b> {talent.name}</Typography>
          <Typography><b>連絡先:</b> {talent.contact}</Typography>
          <Typography><b>スキルセット:</b> {talent.skills && talent.skills.map(skill => <Chip key={skill} label={skill} sx={{ mr: 1 }} />)}</Typography>
          <Typography><b>経験年数:</b> {talent.experience_years != null ? `${talent.experience_years}年` : '-'}</Typography>
          <Typography><b>希望単価:</b> {talent.desired_rate != null ? `${talent.desired_rate.toLocaleString()}円` : '-'}</Typography>
          <Typography><b>希望稼働形態:</b> {talent.work_style}</Typography>
          <Typography><b>稼働可能時期:</b> {talent.available_from}</Typography>
          <Typography><b>備考:</b> {talent.notes}</Typography>
          {talent.resume_url && (
            <Typography>
              <b>履歴書ファイル:</b> <a href={talent.resume_url} target="_blank" rel="noopener noreferrer">ダウンロード</a>
            </Typography>
          )}
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={() => router.push(`/talents/${talent.id}/edit`)}>編集</Button>
        <Button variant="contained" color="secondary" onClick={() => router.push(`/talents/${talent.id}/matching`)}>案件マッチング</Button>
        <Button variant="outlined" color="error" onClick={() => router.push('/talents')}>一覧へ戻る</Button>
      </Stack>
    </Box>
  );
};

export default TalentDetailScreen; 