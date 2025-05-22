import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const BUCKET_NAME = 'uploads'; // Supabase Storageのバケット名（事前に作成しておくこと）

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized', code: 401 });

  // formidableでmultipart/form-dataをパース
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'ファイルアップロード失敗', code: 400 });
    const user_id = fields.user_id || session.user.id;
    const file_type = fields.file_type || 'other';
    const file = files.file;
    if (!file || Array.isArray(file)) return res.status(400).json({ error: 'file is required', code: 400 });

    // ファイルをSupabase Storageにアップロード
    const fileData = fs.readFileSync(file.filepath);
    const ext = file.originalFilename?.split('.').pop() || 'dat';
    const storagePath = `${user_id}/${Date.now()}_${file.newFilename}.${ext}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileData, { contentType: file.mimetype });
    if (storageError) return res.status(500).json({ error: storageError.message, code: 500 });

    // 公開URL取得
    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
    const url = publicUrlData?.publicUrl || '';

    // filesテーブルに保存
    const { data: dbData, error: dbError } = await supabase.from('files').insert([
      { user_id, url, file_type }
    ]).select();
    if (dbError) return res.status(500).json({ error: dbError.message, code: 500 });

    return res.status(201).json(dbData[0]);
  });
} 