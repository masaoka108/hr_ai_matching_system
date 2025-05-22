import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized', code: 401 });
  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: 'Unauthorized', code: 401 });

  const { id } = req.query;

  if (req.method === "GET") {
    let baseQuery = supabase.from('talents').select('*').eq('id', id);
    // 例: if (user.role !== 'admin') baseQuery = baseQuery.eq('created_by', user.id);
    const { data, error } = await baseQuery.single();
    if (error || !data) return res.status(404).json({ error: error?.message || 'Not found', code: 404 });
    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const updates = req.body;
    if (!updates.name) return res.status(400).json({ error: 'name is required', code: 400 });
    let updateQuery = supabase.from('talents').update(updates).eq('id', id).select();
    // 例: if (user.role !== 'admin') updateQuery = updateQuery.eq('created_by', user.id);
    const { data, error } = await updateQuery;
    if (error || !data || data.length === 0) return res.status(404).json({ error: error?.message || 'Not found', code: 404 });
    return res.status(200).json(data[0]);
  }

  if (req.method === "DELETE") {
    let deleteQuery = supabase.from('talents').delete().eq('id', id);
    // 例: if (user.role !== 'admin') deleteQuery = deleteQuery.eq('created_by', user.id);
    const { error } = await deleteQuery;
    if (error) return res.status(500).json({ error: error.message, code: 500 });
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 