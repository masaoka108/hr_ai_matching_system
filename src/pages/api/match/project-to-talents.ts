import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabaseClient';
import openai from '../../../lib/openaiClient';
import { getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized', code: 401 });

  const { project_id } = req.body;
  if (!project_id) return res.status(400).json({ error: 'project_id is required', code: 400 });

  // 案件情報取得
  const { data: project, error: projectError } = await supabase.from('projects').select('*').eq('id', project_id).single();
  if (projectError || !project) return res.status(404).json({ error: 'Project not found', code: 404 });

  // 人材候補リスト取得（例: 必要スキルが1つでも一致する人材を抽出）
  const { data: talents, error: talentsError } = await supabase
    .from('talents')
    .select('*')
    .overlaps('skills', project.required_skills)
    .limit(10);
  if (talentsError) return res.status(500).json({ error: talentsError.message, code: 500 });

  // OpenAIでマッチ度・推薦理由・要約を生成
  const results: any[] = [];
  for (const talent of talents) {
    const prompt = `あなたはIT人材エージェントです。以下の案件情報と人材情報をもとに、マッチ度（0-100）、推薦理由、要約を日本語で出力してください。\n\n【案件情報】\n案件名: ${project.name}\n必要スキル: ${(project.required_skills || []).join(', ')}\n業務内容: ${project.description}\n勤務地: ${project.location}\n報酬: ${project.reward}\n備考: ${project.notes || ''}\n\n【人材情報】\n氏名: ${talent.name}\nスキル: ${(talent.skills || []).join(', ')}\n経験年数: ${talent.experience_years}\n希望単価: ${talent.desired_rate}\n希望稼働形態: ${talent.work_style}\n備考: ${talent.notes || ''}\n\n---\n出力フォーマット:\n{\"match_score\": 数値, \"recommendation\": \"推薦理由\", \"summary\": \"要約\"}`;
    try {
      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'あなたは優秀なIT人材エージェントです。' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 512,
      });
      const text = completion.data.choices[0].message?.content || '';
      // JSONパース
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = { match_score: 0, recommendation: text, summary: '' };
      }
      results.push({
        talent_id: talent.id,
        match_score: parsed.match_score,
        recommendation: parsed.recommendation,
        summary: parsed.summary,
      });
    } catch (e) {
      results.push({
        talent_id: talent.id,
        match_score: 0,
        recommendation: 'AI生成に失敗しました',
        summary: '',
      });
    }
  }

  return res.status(200).json(results);
} 