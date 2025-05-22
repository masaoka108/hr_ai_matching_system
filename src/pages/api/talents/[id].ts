import { supabase } from '../../../lib/supabaseClient';
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized", code: 401 });

  const { id } = req.query;

  // agentは自分の権限範囲のみ、adminは全件
  let baseQuery = supabase.from('talents').select('*').eq('id', id);
  if (session.user.role !== 'admin') {
    // agentの権限制御（例：自分が登録したtalentsのみ操作可能にしたい場合はここで条件追加）
    // 例: baseQuery = baseQuery.eq('created_by', session.user.id);
  }

  if (req.method === "GET") {
    const { data, error } = await baseQuery.single();
    if (error || !data) return res.status(404).json({ error: error?.message || 'Not found', code: 404 });
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const updates = req.body;
    if (!updates.name) return res.status(400).json({ error: 'name is required', code: 400 });
    let updateQuery = supabase.from('talents').update(updates).eq('id', id).select();
    if (session.user.role !== 'admin') {
      // agentの権限制御（例：自分が登録したtalentsのみ操作可能にしたい場合はここで条件追加）
      // 例: updateQuery = updateQuery.eq('created_by', session.user.id);
    }
    const { data, error } = await updateQuery;
    if (error || !data || data.length === 0) return res.status(404).json({ error: error?.message || 'Not found', code: 404 });
    return res.status(200).json(data[0]);
  }

  if (req.method === "DELETE") {
    let deleteQuery = supabase.from('talents').delete().eq('id', id);
    if (session.user.role !== 'admin') {
      // agentの権限制御（例：自分が登録したtalentsのみ操作可能にしたい場合はここで条件追加）
      // 例: deleteQuery = deleteQuery.eq('created_by', session.user.id);
    }
    const { error } = await deleteQuery;
    if (error) return res.status(500).json({ error: error.message, code: 500 });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 