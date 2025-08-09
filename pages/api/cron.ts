import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// This is a stub cron that appends a demo post. Replace with OpenAI call in production.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'posts.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const posts = JSON.parse(raw);
    const id = 'auto-' + Date.now();
    posts.unshift({
      id,
      title: `Bài tự động #${id}`,
      excerpt: 'Bài viết demo sinh tự động. Hãy thay thế nội dung bằng OpenAI để xuất bản thật.',
      image: '/logo.svg',
      productUrl: 'https://shopee.vn',
      createdAt: new Date().toISOString()
    });
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
    res.status(200).json({ ok: true, count: posts.length });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
}
