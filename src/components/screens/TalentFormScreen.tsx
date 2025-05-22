'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Typography, Paper, Stack, TextField, Button, MenuItem, Alert, CircularProgress } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

interface TalentForm {
  name: string;
  contact: string;
  skills: string;
  experience_years: number | '';
  desired_rate: number | '';
  work_style: string;
  available_from: string;
  notes: string;
  resume_file_id?: string;
}

const initialForm: TalentForm = {
  name: '',
  contact: '',
  skills: '',
  experience_years: '',
  desired_rate: '',
  work_style: '',
  available_from: '',
  notes: '',
};

const TalentFormScreen: React.FC = () => {
  const [form, setForm] = useState<TalentForm>(initialForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const params = useParams();
  const talentId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  // 編集時はデータ取得
  useEffect(() => {
    if (talentId) {
      setLoading(true);
      setError('');
      const fetchTalent = async () => {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          const accessToken = session?.access_token;
          if (!accessToken) throw new Error('認証情報がありません。再度ログインしてください。');
          const res = await fetch(`/api/talents/${talentId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!res.ok) throw new Error('データ取得に失敗しました');
          const data = await res.json();
          setForm({
            name: data.name || '',
            contact: data.contact || '',
            skills: Array.isArray(data.skills) ? data.skills.join(', ') : (data.skills || ''),
            experience_years: data.experience_years === null ? '' : data.experience_years,
            desired_rate: data.desired_rate === null ? '' : data.desired_rate,
            work_style: data.work_style || '',
            available_from: data.available_from || '',
            notes: data.notes || '',
            resume_file_id: data.resume_url || undefined,
          });
        } catch (e: any) {
          setError(e.message || 'データ取得に失敗しました');
        } finally {
          setLoading(false);
        }
      };
      fetchTalent();
    }
  }, [talentId]);

  // 入力変更
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ファイル選択
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // 登録/更新
  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    let resume_file_id = form.resume_file_id;
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) throw new Error('認証情報がありません。再度ログインしてください。');
      // ファイルアップロード
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('file_type', 'resume');
        const res = await fetch('/api/files', {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
          body: fd,
        });
        if (!res.ok) throw new Error('ファイルアップロードに失敗しました');
        const fileData = await res.json();
        resume_file_id = fileData.id;
      }
      // DBスキーマに合わせて整形
      const insertObj = {
        name: form.name,
        contact: form.contact,
        skills: form.skills.trim() !== '' ? form.skills.split(',').map(s => s.trim()) : [],
        experience_years: form.experience_years === '' ? null : Number(form.experience_years),
        desired_rate: form.desired_rate === '' ? null : Number(form.desired_rate),
        work_style: form.work_style,
        available_from: form.available_from === '' ? null : form.available_from,
        notes: form.notes,
        resume_url: resume_file_id,
      };
      const method = talentId ? 'PUT' : 'POST';
      const url = talentId ? `/api/talents/${talentId}` : '/api/talents';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(insertObj),
      });
      if (!res.ok) throw new Error('登録/更新に失敗しました');
      setSuccess(talentId ? '更新が完了しました' : '登録が完了しました');
      setTimeout(() => router.push('/talents'), 1200);
    } catch (e: any) {
      setError(e.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>人材登録・編集</Typography>
      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField label="氏名" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField label="連絡先" name="contact" value={form.contact} onChange={handleChange} fullWidth />
          <TextField label="スキルセット（カンマ区切り）" name="skills" value={form.skills} onChange={handleChange} fullWidth />
          <TextField label="経験年数" name="experience_years" type="number" value={form.experience_years} onChange={handleChange} fullWidth />
          <TextField label="希望単価" name="desired_rate" type="number" value={form.desired_rate} onChange={handleChange} fullWidth />
          <TextField
            label="希望稼働形態"
            name="work_style"
            select
            value={form.work_style}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="常駐">常駐</MenuItem>
            <MenuItem value="リモート">リモート</MenuItem>
            <MenuItem value="ハイブリッド">ハイブリッド</MenuItem>
          </TextField>
          <TextField label="稼働可能時期" name="available_from" type="date" value={form.available_from} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
          <TextField label="備考" name="notes" value={form.notes} onChange={handleChange} fullWidth multiline minRows={2} />
          <Button variant="outlined" component="label">
            履歴書ファイル添付
            <input type="file" hidden onChange={handleFileChange} />
            {file && <span style={{ marginLeft: 8 }}>{file.name}</span>}
          </Button>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : (talentId ? '更新' : '登録')}
            </Button>
            <Button variant="outlined" onClick={() => router.push('/talents')}>キャンセル</Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TalentFormScreen; 