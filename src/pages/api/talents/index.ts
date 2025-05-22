import { supabase } from '../../../lib/supabaseClient';
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: "Unauthorized", code: 401 });

  if (req.method === "GET") {
    // クエリパラメータ取得
    const {
      name,
      skills,
      experience_years,
      desired_rate,
      work_style,
      available_from,
      limit = 20,
      offset = 0,
      sort_by = 'created_at',
      order = 'desc',
    } = req.query;

    let query = supabase.from('talents').select('*', { count: 'exact' });

    // agentは自分の権限範囲のみ、adminは全件
    if (session.user.role !== 'admin') {
      // agentの権限制御（例：自分が登録したtalentsのみ取得したい場合はここで条件追加）
      // 例: query = query.eq('created_by', session.user.id);
    }

    // 絞り込み
    if (name) query = query.ilike('name', `%${name}%`);
    if (skills) query = query.contains('skills', Array.isArray(skills) ? skills : [skills]);
    if (experience_years) query = query.gte('experience_years', Number(experience_years));
    if (desired_rate) query = query.lte('desired_rate', Number(desired_rate));
    if (work_style) query = query.eq('work_style', work_style);
    if (available_from) query = query.gte('available_from', available_from);

    // ソート
    query = query.order(sort_by, { ascending: order === 'asc' });
    // ページネーション
    query = query.range(Number(offset), Number(offset) + Number(limit) - 1);

    const { data, error, count } = await query;
    if (error) return res.status(500).json({ error: error.message, code: 500 });
    return res.status(200).json({ data, count });
  }

  if (req.method === "POST") {
    // 必須項目バリデーション
    const { name, contact, skills, experience_years, desired_rate, work_style, available_from, notes, resume_url } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required', code: 400 });
    // agentの場合はcreated_byなどにsession.user.idを入れることも可能
    const insertObj = { name, contact, skills, experience_years, desired_rate, work_style, available_from, notes, resume_url };
    // 例: if (session.user.role !== 'admin') insertObj.created_by = session.user.id;
    const { data, error } = await supabase
      .from('talents')
      .insert([insertObj])
      .select();
    if (error) return res.status(500).json({ error: error.message, code: 500 });
    return res.status(201).json(data[0]);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 