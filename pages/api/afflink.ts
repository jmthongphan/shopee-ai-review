import type { NextApiRequest, NextApiResponse } from 'next';
import { createAFFLink } from '../../lib/accesstrade';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url } = JSON.parse(req.body || '{}');
    if (!url) return res.status(400).json({ error: 'url is required' });
   
    res.status(200).json({ short });
  } catch (e:any) {
    res.status(500).json({ error: e.message || 'Unknown error' });
  }
}
